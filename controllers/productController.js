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
        return res.status(200).json({
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
        const product = await Product.findOne({name: req.params.name});
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

productController.getProductByProviderId = async (req,res) => {
    try{
        let provider = req.params.id;
        console.log(req.params.providerId)

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
                message: "Error retrieving product by provider id"
                
            }
        )
    }
}

productController.addProduct = async (req,res) => {
    try{
        const {name, details, price, stock, image, provider} = req.body;
        
        if(!name || !details || !price || !stock || !image || !provider){
            return res.status(400).json({
                success: false,
                message: 'missing fields'
            });
        }

        const newProduct = {
            name,
            details,
            price,
            stock,
            image,
            provider
        }

        await Product.create(newProduct);

        return res.status(200).json(
            {
                success: true,
                message: 'Product created succesfully',
                data: newProduct
            }
        )
    }catch(error){
        return res.status(500).json(
            {
                success: false,
                message: "Error adding product"
                
            }
        )
    }
}

productController.modifyProductStockById = async (req,res) => {
    try{
        const filter = {_id: req.params.id};
        const product = await Product.findById(req.params.id);
        const update = {
            stock: req.body.stock
        }
        if(!product) {
            return res.status(404).json(
                {
                    success: true,
                    message: "Product not found",
                    data: []
                }
            ); 
        }
        await Product.findOneAndUpdate(filter, update);
        const productUpdated = await Product.findOne(filter).select(['-__v']);
        return res.status(200).json(
            {
                success: true,
                message: "Stock updated succesfully",
                data: productUpdated
            }
        );
    }catch(error){
        if(error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json(
                {
                    success: true,
                    message: "Product not found"
                }
            )
        };

        return res.status(500).json(
            {
                success: false,
                message: "Error finding product",
                error: error?.message || error
            }
        );   
    }
    
}

productController.deleteProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const productDeleted = await Product.findByIdAndDelete(id).select(['-__v']);

        return res.status(200).json({
            success: true,
            message: "Delete product sucessfully",
            data: productDeleted
        })

    
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error deleting product',
                data: error?.message ||error
            }
        )
    }
};


module.exports = productController;