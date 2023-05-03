var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1/e-commerce', {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log('Error connecting to MongoDB', error)
});

app.all('/*', (req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET");
})

app.post('/product', (req, res) => {
 
})