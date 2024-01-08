const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const RolSchema = new Schema({
    rol : {
        type:String,
        required:[true, 'Rol Obligatorio']
    }
})

module.exports = model('Role', RolSchema)