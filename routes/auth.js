const router = require('express').Router();
const User = require('../models/User');



//Register
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    //sending the model to DB
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;