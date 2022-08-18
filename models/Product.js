const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    provider:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Provider',
        required:true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;