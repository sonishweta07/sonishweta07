const express = require('express');

const locationsController = require('../Controllers/locations');
const mealtypesController = require('../Controllers/mealtypes');
const restaurantsController = require('../Controllers/restaurants');
const userController = require('../Controllers/users');
const menuitemsController = require('../Controllers/menuitems');
const paymentController = require('../Controllers/payment');

const route = express.Router();

route.get('/locations', locationsController.getLocations);
route.get('/mealtypes', mealtypesController.getMealTypes);
route.get('/restaurants/:locId', restaurantsController.getRestaurantsByLocId);
route.post('/signup', userController.userSignUp);
route.post('/login', userController.userLogin);
route.post('/filter', restaurantsController.filterRestaurants);
route.get('/getResById/:resId', restaurantsController.getRestaurantsByResId);
route.get('/menuitems/:resId', menuitemsController.getMenuItemsByResId);
route.post('/payment',paymentController.payment);
route.post('/callback',paymentController.callback);


module.exports = route;