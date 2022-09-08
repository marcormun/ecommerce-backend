const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderDate:{
        type: Date,
        required: true
    },
    status:{
        type:String,
        enum: ['processing','send','delivered'],
        required:true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;