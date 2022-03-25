const router = require("express").Router();
const CryptoJS = require("crypto-js");
const {
  verifyToken,
  verifyTokenAutherization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const User = require("../models/User");

router.put("/:id", verifyTokenAutherization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_PASS
    ).toString();
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } // this will ensure will get the updated user
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAutherization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new; //?new=true
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date(); //todays date
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)); // todays day with last year
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: { month: { $month: "$createdAt" } },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 }, //will sum every registered user
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
