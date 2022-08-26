const Product = require('../models/Product');

const productController = {};

productController.getAllProducts = async (req, res) => {
    try{
        const products = await Product.find();
        if(!products){
            return res.status(200).json({
                success: true,
                message: 'Products not found'
            }); 
        }
        return res.status(200),json({
            success: true,
            message: 'Get all products retreved succesfully',
            data: products
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error retrieving products',
            error: error.message
        })
    }
}

productController.getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(200).json({
                success: true,
                message: 'Product not found'
            }); 
        }
        return res.status(200).json({
            success: true,
            message: 'Get product retrieved succcesfully',
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error retrieving product',
            error: error.message
        })
    }
}

productController.getProductByName = async (req, res) => {
    try{
        const product = await Product.findOne({name: req.params.id});
        if(!product){
            return res.status(200).json({
                success: true,
                message: 'Product not found'
            }); 
        }
        return res.status(200).json({
            success: true,
            message: 'Get product retrieved succcesfully',
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error retrieving product',
            error: error.message
        })
    }
}

productController.getProductByProviderName = async (req,res) => {
    try{
        let {provider} = req.body;

        const product = await Product.find({provider});

        if(!provider || product.length === 0 || !product){
            return res.status(404).json(
                {
                    success: false,
                    message: "Provider not found"
                    
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: "Provider found",
                data: product
            }
        )

    }catch(error){
        return res.status(500).json(
            {
                success: false,
                message: "Error retrieving product by provider name"
                
            }
        )
    }
}


module.exports = productController;