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

orderController.modifyOrderStatusById = async (req,res) => {
    try{
        const filter = {_id: req.params.id};
        const order = await Order.findById(req.params.id);
        const update = {
            status: req.body.status
        }
        if(!order) {
            return res.status(404).json(
                {
                    success: true,
                    message: "Order not found",
                    data: []
                }
            ); 
        }
        await Order.findOneAndUpdate(filter, update);
        const orderUpdated = await Order.findOne(filter).select(['-__v']);
        return res.status(200).json(
            {
                success: true,
                message: "Status updated succesfully",
                data: orderUpdated
            }
        );
    }catch(error){
        if(error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json(
                {
                    success: true,
                    message: "Order not found"
                }
            )
        };

        return res.status(500).json(
            {
                success: false,
                message: "Error finding order",
                error: error?.message || error
            }
        );   
    }  
}


orderController.deleteOrderById = async (req, res) => {
    try {
        const {id} = req.params;
        const orderDeleted = await Order.findByIdAndDelete(id).select(['-__v']);

        return res.status(200).json({
            success: true,
            message: "Delete order sucessfully",
            data: orderDeleted
        })

    
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error deleting order',
                data: error?.message ||error
            }
        )
    }
};

module.exports = orderController;