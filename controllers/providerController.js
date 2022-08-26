const Provider = require('../models/Provider');

const providerController = {};

providerController.getAllProviders = async (req, res) => {
    try{
        const providers = await Provider.find();
        if(!providers){
            return res.status(200).json({
                success: true,
                message: 'Providers not found'
            }); 
        }
        return res.status(200).json({
            success: true,
            message: 'Get all providers retrieved succcesfully',
            data: providers
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error retrieving providers',
            error: error.message
        })
    }
}

providerController.getProviderById = async (req, res) => {
    try{
        const provider = await Provider.findById(req.params.id);
        if(!provider){
            return res.status(200).json({
                success: true,
                message: 'Provider not found'
            }); 
        }
        return res.status(200).json({
            success: true,
            message: 'Get provider retrieved succcesfully',
            data: provider
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error retrieving provider',
            error: error.message
        })
    }
}

providerController.getProviderByName = async (req, res) => {
    try{
        const provider = await Provider.findOne({name: req.params.id});
        if(!provider){
            return res.status(200).json({
                success: true,
                message: 'Provider not found'
            }); 
        }
        return res.status(200).json({
            success: true,
            message: 'Get provider retrieved succcesfully',
            data: provider
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error retrieving provider',
            error: error.message
        })
    }
}

providerController.createProvider = async (req, res) => {
    try{
        const {name, phoneNumber} = req.body;

        const newProvider = {
            name,
            phoneNumber
        };

        if(!name || !phoneNumber){
            return res.status(200).json({
                success: false,
                message: 'Name and phone number are required'
            });
        }

        const provider = await Provider.create(newProvider);
        
        return res.status(200).json({
            success: true,
            message: 'Provider created succcesfully',
            data: provider
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error creating provider',
            error: error.message
        })
    }
}

providerController.modifyProvider = async (req, res) => {
    try{
        const filter = {_id: req.params.id};
        
        const provider = await Provider.findByIdAndUpdate(req.params.id);
        
        const update = {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber
        };
        if(req.user_role!='admin'){
            return res.status(404).json(
                {
                    success: true,
                    message: "You don't have permission to update providers"
                }
            );
        }

        if(!provider){
            return res.status(404).json(
                {
                    success: true,
                    message: "Provider not found"
                }
            );
        }
        
        await Provider.findOneAndUpdate(filter, update);
        
        const providerUpdated = await Provider.findOne(filter).select(['-password','-__v']);
        
        return res.status(200).json(
            {
                success: true,
                message: "Provider updated succesfully",
                data: providerUpdated
            }
        );

    }catch(error){
        if(error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json(
                {
                    success: true,
                    message: "Provider not found"
                }
            )
        };

        return res.status(500).json(
            {
                success: false,
                message: "Error finding provider",
                error: error?.message || error
            }
        );  
    }
}

providerController.deleteProviderById = async (req, res) => {
    try {
        const {id} = req.params;
        const providerDeleted = await Provider.findByIdAndDelete(id).select(['-password','-__v']);
        if(req.user_role!='admin'){
            return res.status(404).json(
                {
                    success: true,
                    message: "You don't have permission to delete providers"
                }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Delete provider sucessfully",
            data: providerDeleted
        })

    
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error deleting provider',
                data: error?.message ||error
            }
        )
    }
};

module.exports = providerController;