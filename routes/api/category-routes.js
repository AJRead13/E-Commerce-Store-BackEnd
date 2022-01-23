const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
    });
    res.status(200).json(allCategories);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", 'product_name', "price", "stock", 'category_id']
        }],
    });
    res.status(200).json(oneCategory);
  } catch (error) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"]
        }],
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json(err)
  }
});
router.put('/:id', async (req, res) => {
  try {
    const updateCat = await Category.update(
      req.body, {

      where:
        { id: req.params.id }
    });
    res.status(201).json(updateCat);
  } catch (error) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCat = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCat) {
      res.status(404).json({ message: "No Category found with that id..." });
      return;
    }
    res.status(200).json(deleteCat);
  } catch (err) {
    res.status(500).json(err)
  }
  
});

module.exports = router;
