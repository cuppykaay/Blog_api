const express = require("express");

const cryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const User = require ("../models/user")
const router = require("express").Router();

router.post("/register", async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: cryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),     
    })
        try{    
            const savedUser = await newUser.save();
            res.status(201).json({ message: "Account Created!"})

        }catch(err) {
            console.log(err);
        }
    
});

router.post("/login", async(req, res) => {
    try{
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json({ message: "Account not found!!"})
        const hashpassword = await cryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString()
        if(!hashpassword == req.body.password){
            res.status(401).json({ message: "Account not found"})
        }else{
            const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SEC,
            {expiresIn: "3days"}
            );

            const {password, ...others} = user._doc;
            res.status(200).json({...others, accessToken})
        }
    }catch(err){
        console.log(err);
    }

})

module.exports = router