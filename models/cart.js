var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = mongoose.Schema.ObjectId
var cart = new Schema({
    title: {type: String, default: "My Cart"},
    products: [{type: ObjectId, ref: 'Product'}]
})


// cart.pre('findOneAndUpdate', async function(next) {
//     const existingItem = await this.model.findOne(this.getFilter());
//     if (existingItem) {
//         console.log("item already exists")
//     } else {
//         console.log("Item may not exist")
//     }
//     next();
// })

module.exports = mongoose.model('Cart', cart);