const express = require("express");
var mongoose = require("mongoose");
const Joi = require('@hapi/joi');

var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user",
    }
})
var User = mongoose.model("User", UserSchema);


function validateUser(data) {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(10).required(),
    })
    return schema.validate(data, { abortEarly: false })
}

function validateUserLogin(data) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(10).required(),
    })
    return schema.validate(data, { abortEarly: false })
}

module.exports.User = User;
module.exports.validateUser = validateUser //signup
module.exports.validateUserLogin = validateUserLogin //login
