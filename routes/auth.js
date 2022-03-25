const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

router.post("/register", async (req, res, next) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.CRYPTO_PASS).toString()
    }) 
    try {
        const savedUser = await newUser.save();
        res.status(201).json({message: 'user created...'});
    } catch(err) {
       res.status(500).json(err);
    }
});

router.post("/login",async(req, res, next) => {
    try{
        const user = await User.findOne({username:req.body.username});
        !user && res.status(401).json("wrong credentials")
        const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.CRYPTO_PASS);
        const savedpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        savedpassword !== req.body.password && res.status(401).json("wrong credentials");
        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,
        },process.env.JWT_SECRET,
          {expiresIn:'2d'}
        );
        const {password, ...others} = user._doc;
        res.status(200).json({user:others,accessToken:accessToken,message:"login successfull..."});
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;