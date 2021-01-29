const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const queue = require('amqplib');
const mongoose = require('mongoose');

const instance = express();

instance.use(bodyParser.json());
instance.use(bodyParser.urlencoded({ extended: false }));
instance.use(cors());

let Order = mongoose.Schema({
    OrderRowId: Number,
    OrderId: String,
    CustomerName: String,
    ProductId: String,
    Quantity: Number,
    TotalPrice: Number
});
let OrderModel = mongoose.model("Order", Order, "Order");
let db = mongoose.connect("mongodb://database:27017/OrderServiceDB", {
    useNewUrlParser: true, // Parse Schema and Map with Model
    useUnifiedTopology: true
});


var dbConnection = mongoose.connection; // make sure that the connection is done 
if (!dbConnection) {
    console.log('Cannot Connect to the database');
    return;
}
// 6. rest api
// get all request
instance.get('/api/order', function(req, resp) {
    OrderModel.find().exec(function(err, res) {
        if (err) {
            resp.send({ statusCode: 500, message: err.message });
        }
        resp.send({ statusCode: 200, data: res });
    });
});

// post request
instance.post('/api/order', function(req, resp) {
    // read data from request body
    var ord = {
        OrderRowId: req.body.OrderRowId,
        OrderId: req.body.OrderId,
        CustomerName: req.body.CustomerName,
        ProductId: req.body.ProductId,
        Quantity: req.body.Quantity,
        TotalPrice: req.body.TotalPrice
    };
    OrderModel.create(ord, function(err, res) {
        if (err) {
            resp.send({ statusCode: 500, message: err.message });
        }
        resp.send({ statusCode: 200, data: res });
    })
});

// get record based on id
instance.get('/api/order/:id', function(req, resp) {
    // read id from  request URL parameter
    var id = req.params.id;
    OrderModel.findOne({ _id: id }, function(err, doc) {
        if (err) {
            resp.send({ statusCode: 500, message: err.message });
        }
        resp.send({ statusCode: 200, data: doc });
    });
});

// update
instance.put('/api/order/:id', function(req, resp) {
    // read id from  request URL parameter
    var id = req.params.id;

    // read data from request body
    var ord = {
        OrderRowId: req.body.OrderRowId,
        OrderId: req.body.OrderId,
        CustomerName: req.body.CustomerName,
        ProductId: req.body.ProductId,
        Quantity: req.body.Quantity,
        TotalPrice: req.body.TotalPrice
    };

    OrderModel.findOneAndUpdate({ _id: id }, ord, function(err, doc) {
        if (err) {
            resp.send({ statusCode: 500, message: err.message });
        }
        resp.send({ statusCode: 200, data: doc });
    });
});



instance.listen(4002, () => {
    console.log('Product Service started on port 4001');
});