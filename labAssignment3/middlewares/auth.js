const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../models/user");

async function auth(req, res, next) {
    let token = req.header("x-auth-token")
    if (!token) return res.status(401).send("Token not prvided");
    try {
        let user = jwt.verify(token, config.get("jwtPrivateKey"));
        req.user = await User.findById(user._id);

        next();
    }
    catch (error) {
        res.status(400).send("Invalid token");
    }
}
module.exports = auth