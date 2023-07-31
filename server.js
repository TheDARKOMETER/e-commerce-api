var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Product = require('./models/product');
const path = require("path");
const Cart = require('./models/cart');
const wishlist = require('../swag-shop-api/model/wishlist');
var ObjectId = mongoose.Types.ObjectId
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
// TODO: ADD PICTURES, DO NOT PROCRASTINATE, ADD REMOVE OPERATION. UPDATE THE 
// SCHEMA TO INCLUDE IMGURL PROPERTY.
var db = mongoose.connect('mongodb://127.0.0.1/e-commerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log('Error connecting to MongoDB', error)
});

app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    next();
})

app.post('/product', (req, res) => {
    var product = new Product();
    product.title = req.body.title;
    product.price = req.body.price;
    product.save().then((savedProduct) => {
        res.status(200).send(savedProduct)
    }).catch(err => {
        res.status(500).send({ error: "Could not post product" })
    })
})

app.get('/product', (req, res) => {
    Product.find({}).then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send(err)
    });
})

app.delete('/cart/delete/:id', (req, res) => {
    const cartId = new ObjectId(req.params.id)
    Cart.updateMany({}, { $pull: { products: cartId } }).then(result => {
        res.send(result)
    }).catch(err => res.status(500).send({ error: err }))
})

app.get('/cart', (req, res) => {
    Cart.find({}).populate({ path: 'products', model: 'Product' }).exec().then(
        wishLists => {
            res.status(200).send(wishLists)
        }
    ).catch(err => res.status(500).send({ error: "Could not establish cart" }))
})



app.get('/product/:id', (req, res) => {
    const productId = new ObjectId(req.params.id)
    Product.find({ _id: productId }).then(result => {
        res.send(result)
    }).catch(err => res.status(500).send({ error: err }))
})


app.get('/cart/:id', (req, res) => {
    const cartId = new ObjectId(req.params.id)
    Cart.find({ _id: cartId }).then(result => {
        res.send(result)
    }).catch(err => res.status(500).send({ error: err }))
})


app.post('/cart', (req, res) => {
    var cart = new Cart();
    cart.title = req.body.title;

    cart.save().then(newCart => {
        res.send(newCart);
    }).catch(err => res.status(500).send({ error: "Could not create new wishlist" }))
})

app.put('/cart/product/add', (req, res) => {
    Product.findOne({ _id: req.body.productID }).then(product => {
        Cart.findOneAndUpdate({ _id: req.body.cartID }, { $addToSet: { products: product._id } }, { new: false })
            .then(cart => {
                if (cart.products.includes(req.body.productID)) {
                    console.log("Item already exists")
                    return res.send(true)
                } else {
                    res.send(cart)
                }
            }
            )
            .catch(err =>
                res.status(500).send({ error: "Could not add item to cart" })
            )
    }).catch(err => {
        res.status(500).send({ error: "Could not find product" })
    })
})




app.put('/product', (req, res) => {

    // Product.findOne({_id: request.body.productID}).then(product => {
    //     Product.updateOne({_id: res.body.productID}, {title: res.body.title, price: res.body.price}).then(
    //         updatedProduct => {
    //             response.send(updatedProduct);
    //         }
    //     ).catch(err => {
    //         response.status(404).send({error:"Could not find product", err})
    //     })
    // })
    Product.findByIdAndUpdate(req.body.productID, { title: req.body.title, price: req.body.price }).then(updatedProduct => {
        if (updatedProduct !== null) {
            res.send(updatedProduct);
        } else {
            res.status(404).send({ error: "Product was not found" });
        }
    }
    ).catch(err => {
        res.status(500).send({ error: "Error occured" });
    }
    )
})


app.put('/removeProduct', (req, res) => {
    // Product.remo
})

app.get('/', (req, res) => {
    res.send("Hello");
})


//TO DO
// app.put('/product/:productID', (req, res) => {
//     var
// })

app.listen(3004, () => {
    console.log("Running on port 3004")
})