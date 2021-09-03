const router = require("express").Router();
// import the model
const { Category, Product, ProductTag, Tag } = require("../../models");


router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product, ProductTag, Tag }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Daniel is not sure about this one
router.put("/:id", async (req, res) => {
  try {
  const categoryData = await Category.update({
    where: {
      id: req.params.id,
    },
  });

  if (!categoryData) {
    res.status(404).json({ message: "No category found with that id" });
    return;
  }

  res.status(200).json(categoryData);
  } catch (err) {
  res.status(500).json(err);
  }
});



router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
