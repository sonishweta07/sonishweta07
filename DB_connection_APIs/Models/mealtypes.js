const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealtypeSchema = new Schema({
    name: {
        type:String,
        require: true
    },
    mealtypeId: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('mealtype', mealtypeSchema, 'mealtypes');
