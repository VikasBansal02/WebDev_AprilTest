const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');
const Joi=require('joi');
const {validateProducts,isLoggedIn,isSeller,isProductAuthor}=require('../middleware')

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('products/index', { products });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})



router.get('/products/new',isLoggedIn,isSeller, (req, res) => {

    

    try {
        res.render('products/new');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }

})

//posting the newly added product to the home
router.post('/products',isLoggedIn,isSeller,validateProducts, async (req, res) => {
    try {
        const { name, img, desc, price } = req.body;
        
        
        await Product.create({ name, img, price: parseFloat(price), desc,author:req.user._id })
        req.flash('success','Successfully Added a new Product');
        res.redirect('/products')
    }
    catch (e) {
        res.status(500).render('error', { err: e.message});
    }

})

//display the product
router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('reviews');
    
        res.render('products/show', { product });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }

})


//edit the product
router.get('/product/:id/edit',isLoggedIn,isProductAuthor, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.render('products/edit', { product });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }

})

//save the editted data
router.patch('/products/:id',isLoggedIn,isProductAuthor,validateProducts, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, img, desc } = req.body;
        await Product.findByIdAndUpdate(id, { name, price, desc, img });
        req.flash('success','Edit your product successfully');
        res.redirect(`/products/${id}`);
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }

});

//delete the particular product
router.delete('/products/:id',isLoggedIn,isProductAuthor, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        for (let id of product.reviews) {
            await Review.findByIdAndDelete(id);
        }
        await Product.findByIdAndDelete(id);
        res.redirect('/products')
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }

})

module.exports = router;