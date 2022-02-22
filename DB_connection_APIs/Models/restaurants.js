const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type:String,
        require: true
        },    
    location_id: {
            type :Number,
            require: true
        },
     mealtype_id:{
            type : Number,
            require: true
        },
     cuisine_id:{
         type: Number,
         require: true
     },  
     lcost:{
         type: Number,
         require: true
     },
     hcost:{
         type: Number,
         require: true
     },
     sort:{
         type: Number,
         require: true
     }
})

module.exports = mongoose.model('restaurant', restaurantSchema, 'restaurants');
