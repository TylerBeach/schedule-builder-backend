const mongoose = require('mongoose');

// Define a Product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String
});

// Create a Product model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
