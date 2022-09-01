const Order = require ('../models/Order');

const orderController = {};

orderController.getAllOrders = async (req,res) => {
    try {
        const orders = await Order.find();

        return res.status(200).json(
            {
                success: true,
                message: 'Get all orders retrieved succsessfully',
                data: orders
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error retrieving orders',
                error: error.message
            }
        )
    }
};

orderController.getAllOrdersByUser = async (req,res) => {
    try {
        const orders = await Order.find({userId: req.params.id});
        
        return res.status(200).json(
            {
                success: true,
                message: 'Get all orders retrieved succsessfully',
                data: orders
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error retrieving orders',
                error: error.message
            }
        )
    }
}

orderController.addOrder = async (req,res) => {
    try{
        const {orderDate, status, userId, productId} = req.body;
        
        if(!orderDate || !status || !userId || !productId){
            return res.status(400).json({
                success: false,
                message: 'missing fields'
            });
        }

        const newOrder = {
            orderDate,
            status,
            userId,
            productId
        }

        await Order.create(newOrder);

        return res.status(200).json(
            {
                success: true,
                message: 'Order created succesfully',
                data: newOrder
            }
        )
    }catch(error){
        return res.status(500).json(
            {
                success: false,
                message: "Error adding order"
                
            }
        )
    }
}

module.exports = orderController;