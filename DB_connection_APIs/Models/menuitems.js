const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuitemsSchema = new Schema({
    name: {
        type:String,
        require: true
    },
    restaurantId: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('menuitems', menuitemsSchema, 'Menu');
