const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      // include: {
      //   model: Product,
      //   attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      // }
    });
    res.status(200).json(allTags);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);    
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
    });
    res.status(200).json(oneTag);
  } catch (error) {
    res.status(500).json(err)
    
  }
  // find a single tag by its `id`r
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body, {
      include: [
        {
          model: Tag,
          attributes: ["id", "tag_name"]
        }
      ]
    })
  } catch (error) {
    
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
