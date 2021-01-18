const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/user')
const adminLogic = require('../business-logic/admin-logic');
const uuid = require('uuid');
const jwt = require('../helpers/jwt');
const { request } = require('express');


router.put('/update-product', jwt.verifyUser, async (request, response) => {
    if (!request.verifyUser) {
        response.status(401).send({error: request.err});
    }
    try {
        const oldProduct = new Product(JSON.parse(request.body.product));
        /// if there is file in the request
        if (request.files) {
            const file = request.files.image;
            const randomName = uuid.v4();
            const extension = file.name.substr(file.name.lastIndexOf('.'));
            file.mv('./uploads/products/' + randomName + extension);
            oldProduct.img = randomName + extension;
        }
        const updatedProduct = await adminLogic.updateProduct(oldProduct);
        if (oldProduct === null) { response.sendStatus(404); return; }
        response.json(updatedProduct);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post('/add-product', jwt.verifyUser, async (request, response) => {
    if (!request.verifyUser) {
        response.status(401).send({error: request.err});
    }
    try {
        if (!request.files) {
            throw "You need to upload image !"
        }
        //upload image 
        const file = request.files.image;
        const randomName = uuid.v4();
        const extension = file.name.substr(file.name.lastIndexOf('.'));
        file.mv('./uploads/products/' + randomName + extension);
        //-------------
        const product = new Product(JSON.parse(request.body.product));
        product.img = randomName + extension;
        const addedProduct = await adminLogic.addProduct(product);
        response.json(addedProduct);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

//for the update /add form.
router.get('/get-all-categories',  jwt.verifyUser, async (request, response) => {
    if (!request.verifyUser) {
        response.status(401).send({error: request.err});
    }
    try {
        const categories = await adminLogic.getAllCategories();
        response.json(categories);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/check_admin', jwt.verifyUser, async (req, res) =>{
    const user = await User.findById(req.authData.user._id).exec();
    if (user.isAdmin){
        res.json({'isAdmin': true})
    }
    else{
        res.json({'isAdmin': false})
    }
});

module.exports = router;