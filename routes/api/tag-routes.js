const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');



router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: {
        model: Product,
        through: ProductTag,
        as: "item_tags",
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    });
    res.status(200).json(allTags);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
    });
    res.status(200).json(oneTag);
  } catch (error) {
    res.status(500).json(err)

  }

});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body, {
      // include: [
      //   {
      //     model: Product,
      //     attributes: ["id", "product_name", "price", "stock", "category_id"]
      //   }],
    });
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json(err)
  }

});

router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where:
        { id: req.params.id }
    });
    res.status(201).json(updatedTag)

  } catch (error) {

  }
 
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.status(404).json({ message: "No Tag found with that id..." });
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err)
  }
 
});

module.exports = router;
