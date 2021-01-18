const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const productsLogic = require('../business-logic/products-logic');
const fs = require('fs');

router.get('/get-all-products', async (request, response) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/search-product/:name', async (request, response) => {
    try {
        const name = request.params.name;
        const result = await productsLogic.searchProduct(name);
        response.json(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/image/:name', async (request, response) => {
    try {
        const name = request.params.name;
        folder_path = "/media/scripter/shared/Study/Master/web_prorgramming/online_store_project/Final-Project-online-store/Server/uploads/products/"
        fs.readFile(folder_path + name,(err,data)=> {
            if(err){
                throw err;
            }
            response.end(data);
        });
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;