var mongoose = require('mongoose');
var Schema = mongoose.Schema

var product = new Schema({
    title: String,
    price: Number,
    rating: {type: Number, min: 0, max: 5, default: 0}
});

module.exports = mongoose.model('Product', product);