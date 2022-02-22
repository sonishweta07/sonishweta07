const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name: {
        type:String,
        require: true
    },
    locationId: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('locations', locationSchema, 'cities');
