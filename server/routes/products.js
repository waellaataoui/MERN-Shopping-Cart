const router = require("express").Router();
const Product = require("../models/Product");
router.get("/", async (req, res) => {
  const minPrice = req.query.minPrice || 0;
  const maxPrice = req.query.maxPrice || 99999;
  const category = req.query.category;
  const search = req.query.search;

  var query = {
    $and: [
      { "pricing.retail": { $gte: minPrice } },
      { "pricing.retail": { $lte: maxPrice } },
    ],
  };
  if (category) query["type"] = category;
  if (search)
    query = {
      ...query,
      $or: [
        { title: { $regex: ".*" + search + ".*", $options: "i" } },
        { description: { $regex: ".*" + search + ".*", $options: "i" } },
      ],
    };

  try {
    const products = await Product.find(query, null, {
      skip: parseInt(req.query.skip),
      limit: 5,
    }).sort(req.query.sort);
    const count = await Product.countDocuments(query);
    if (!products || products.length == 0) {
      return res.status(404).send("No products found :(");
    }
    const maxPriced = await Product.findOne(query).sort("-pricing.retail");

    res.send({ products, count, maxPrice: maxPriced.pricing.retail });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    return res.send(product);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
module.exports = router;
