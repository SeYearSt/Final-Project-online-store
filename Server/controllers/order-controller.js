const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const orderLogic = require('../business-logic/order-logic');
const path = './uploads/receipts/';
const uuid = require('uuid');
const jwt = require('../helpers/jwt');

router.post('/', async (request, response) => {
    try {
        const order = new Order(request.body);
        order.orderDate = new Date();
        const addedOrder = await orderLogic.addOrder(order);
        // create receipt
        const fileName = uuid.v4();
        const receiptContent = await orderLogic.receiptContent(order);
        const receipt = await orderLogic.createReceipt(path + fileName +".txt", receiptContent);
        response.json({ order: addedOrder, file: receipt });
    } catch (error) {
        response.status(500).send(error.message);
    }
});
router.get('/get-all-orders', jwt.verifyUser, async (request, response) => {
    if (!request.verifiedUser) {
        response.status(401).send({error: request.err});
    }

    try {
        const orders = await orderLogic.getAllOrders();
        response.json(orders);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

router.get('/get-receipt/:name', async(request,response) =>{
    try {
        const file = path + request.params.name;
        response.download(file,'receipt.txt');
    } catch (error) {
        response.status(500).send(error.message);
    }
});

module.exports = router;