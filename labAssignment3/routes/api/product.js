const express = require("express");
var router = express.Router();
const validateProduct = require("../../middlewares/validateProduct");
var { Product } = require("../../models/product");
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");


//get prodcut
router.get("/", auth, admin, async (req, res) => {
    try {
        console.log(req.user);
        let page = Number(req.query.page ? req.query.page : 1);
        let perPage = Number(req.query.perPage ? req.query.perPage : 10);
        let skipRecords = perPage * (page - 1);
        let product = await Product.find().skip(skipRecords).limit(perPage);
        return res.send(product);
    } catch (err) {
        return res.status(500).send(err);
    }
})

//get single product
router.get("/:id", async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send("Product not found");
        return res.send(product);
    }
    catch (err) {
        return res.status(500).send(err);
    }
})

//update product
router.put("/:id", validateProduct, async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        // if (!product) {
        //     return res.status(404).json({ error: "Product not found" });
        // }
        // if (req.body.price === undefined) {
        //     return res.status(400).json({ error: "Price is required" });
        // }

        product.name = req.body.name;
        product.price = req.body.price;
        await product.save();
        return res.send(product);
    }
    catch (err) {
        return res.status(500).send(err);
    }
})

router.delete("/:id", async (req, res) => {
    let product = await Product.findByIdAndDelete(req.params.id);
    return res.send(product);
})

router.post("/", validateProduct, async (req, res) => {
    let product = new Product()
    product.name = req.body.name;
    product.price = req.body.price;
    await product.save();
    return res.send(product)
})

//we will use happyjoi for validation
module.exports = router;