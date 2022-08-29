const mongoose = require('mongoose');

const roleSchema = new mongoose.mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;