const Role = require('../models/Role');

const roleController = {};

roleController.getAllRoles = async (req,res) => {
    try{
        const roles = await Role.find();
        if(!roles){
            return res.status(200).json({
                success: true,
                message: 'Roles not found'
            }); 
        }
        return res.status(200).json({
            success: true,
            message: 'Get all roles retrieved succcesfully',
            data: roles
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error retrieving roles',
            error: error.message
        })
    }
}

roleController.addRole = async (req, res) => {
    try{
        const {name} = req.body;

        const newRole = {
            name
        };

        if(!name){
            return res.status(200).json({
                success: false,
                message: 'Name is required'
            });
        }

        const role = await Role.create(newRole);
        
        return res.status(200).json({
            success: true,
            message: 'Role created succcesfully',
            data: role
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error creating role',
            error: error.message
        })
    }
}

roleController.deleteRoleById = async (req, res) => {
    try {
        const {id} = req.params;
        const roleDeleted = await Role.findByIdAndDelete(id).select(['-__v']);

        return res.status(200).json({
            success: true,
            message: "Delete role sucessfully",
            data: roleDeleted
        })

    
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error deleting role',
                data: error?.message ||error
            }
        )
    }
};

module.exports = roleController;