const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const queue = require('amqplib');
const mongoose = require('mongoose');

const instance = express();

instance.use(bodyParser.json());
instance.use(bodyParser.urlencoded({ extended: false }));
instance.use(cors());

let Product = mongoose.Schema({
    ProductRowId: Number,
    ProductId: String,
    ProductName: String,
    Manufacturer: String,
    Price: Number
});
let ProductModel = mongoose.model("Product", Product, "Product");
let db = mongoose.connect("mongodb://database:27017/ProductServiceDB", {
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
instance.get('/api/product', function(req, resp) {
    ProductModel.find().exec(function(err, res) {
        if (err) {
            resp.send({ statusCode: 500, message: err.message });
        }
        resp.send({ statusCode: 200, data: res });
    });
});

// post request
instance.post('/api/product', function(req, resp) {
    // read data from request body
    var prd = {
        ProductRowId: req.body.ProductRowId,
        ProductId: req.body.ProductId,
        ProductName: req.body.ProductName,
        Manufacturer: req.body.Manufacturer,
        Price: req.body.Price
    };
    ProductModel.create(prd, function(err, res) {
        if (err) {
            resp.send({ statusCode: 500, message: err.message });
        }
        resp.send({ statusCode: 200, data: res });
    })
});

// get record based on id
instance.get('/api/product/:id', function(req, resp) {
    // read id from  request URL parameter
    var id = req.params.id;
    ProductModel.findOne({ _id: id }, function(err, doc) {
        if (err) {
            resp.send({ statusCode: 500, message: err.message });
        }
        resp.send({ statusCode: 200, data: doc });
    });
});

// update
instance.put('/api/product/:id', function(req, resp) {
    // read id from  request URL parameter
    var id = req.params.id;

    // read data from request body
    var prd = {
        ProductRowId: req.body.ProductRowId,
        ProductId: req.body.ProductId,
        ProductName: req.body.ProductName,
        Manufacturer: req.body.Manufacturer,
        Price: req.body.Price
    };

    ProductModel.findOneAndUpdate({ _id: id }, prd, function(err, doc) {
        if (err) {
            resp.send({ statusCode: 500, message: err.message });
        }
        resp.send({ statusCode: 200, data: doc });
    });
});



instance.listen(4001, () => {
    console.log('Product Service started on port 4001');
});