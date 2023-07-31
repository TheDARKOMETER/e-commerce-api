var mongoose = require('mongoose');
var Schema = mongoose.Schema

var product = new Schema({
    title: String,
    price: Number,
    rating: { type: Number, min: 0, max: 5, default: 0 }
});

product.add({
    imgUrl: { type: String, default: "http://127.0.0.1:8080/default.png" }
})

// product.pre('findOneAndUpdate', async function(next) {
//     const existingItem =  await this.model.findOne(this.getFilter());
//     console.log("Debug")
//     if (existingItem){
//         console.log("Item already exists")
//     } else {
//         console.log("Unsuccessful")
//     }
//     next();
// })

module.exports = mongoose.model('Product', product);