var express = require("express");
var router = express.Router();
const User = require("../models/User");

/* GET users listing. */
router.get("/", function (req, res) {
  res.send(req.user);
});
//sign-up
router.post("/register", async (req, res) => {
  console.log(req.body.password);
  if (!req.body.password) {
    return res.status(400).send("error");
  }
  const user = new User({ ...req.body, profileName: req.body.username });

  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
