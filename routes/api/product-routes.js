const router = require('express').Router();
const res = require('express/lib/response');
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const allProducts = await Product.findAll({
    });
    res.status(201).json(allProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const oneProduct = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Tag,
          through: ProductTag,
          as: "product_tags",
          attributes: ["id", "tag_name"]
        }
      ],    
    });
    res.status(200).json(oneProduct);
  }catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body, {
      include: [
        {
          model: Category,
          attributes: ["id", "category_name"]
        }],
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateProduct = await Product.update(
      req.body, {

      where:
        { id: req.params.id }
    });
    res.status(201).json(updateProduct);
  } catch (error) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteProduct) {
      res.status(404).json({ message: "No Product found with that id..." });
      return;
    }
    res.status(200).json(deleteCat);
  } catch (err) {
    res.status(500).json(err)
  }
  
});

module.exports = router;
