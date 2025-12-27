const express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
let { User } = require("../../models/user");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middlewares/auth");


router.post("/register", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");
    user = new User();
    user.name = req.body.name,
        user.email = req.body.email,
        user.password = req.body.password
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    await user.save();
    return res.send(_.pick(user, ["name", "email"]));

});

router.post("/login", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email");
    let validPasswoord = await bcrypt.compare(req.body.password, user.password);
    if (!validPasswoord) return res.status(401).send("Invalid password");
    let token = jwt.sign({ _id: user._id, name: user.name }, config.get("jwtPrivateKey"))
    return res.send(token);
})
module.exports = router;

// For password first we use bcrypt to add some extra string in it
// nowin postman request it is also showing password there to hide it we will use lodash package
