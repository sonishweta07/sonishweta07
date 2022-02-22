const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type:String,
        require: true
    },    
        password: {
            type :String,
            require: true
    },
        firstname: {
             type:String,
             require: true
    },
        lastname: {
            type:String,
            require: true
    }

})

module.exports = mongoose.model('user', userSchema, 'users');
