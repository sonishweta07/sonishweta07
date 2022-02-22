const Restaurants = require('../Models/restaurants');

exports.getRestaurantsByLocId = (req, res) => {
    const { locId } = req.params;
    Restaurants.find({location_id : locId})
        .then(response => {
        res.status(200).json({
            message: "Restaurants Fetched Sucessfully",
            restaurants: response
            })
        })
    .catch(err => {
        res.status(500).json({error: err})
    })
}   

exports.filterRestaurants = (req, res) => {
    let {mealtype, location, cuisine, lcost, hcost, page, sort} = req.body;

    sort = sort ? sort :1;
    page = page ? page :1;

    const itemsPerPage = 2;
    let startIndex = page * itemsPerPage - itemsPerPage;
    let endIndex = page * itemsPerPage;

    let filterObj = {};

    mealtype && (filterObj["mealtype_id"] = mealtype);
    location && (filterObj["location_id"] = location);
    cuisine && (filterObj["cuisine_id"] = { $in: cuisine});
    lcost && hcost && (filterObj["min_price"] = { $gte: lcost, $lte: hcost});


    Restaurants.find(filterObj).sort({ min_price: sort })
        .then(response => {
            const filteredResponse = response.slice(startIndex, endIndex);
            const data = Math.ceil(response.length/itemsPerPage);
            console.log(data);
            res.status(200).json({
            message: "Restaurants Fetched Sucessfully",
            restaurants: filteredResponse,
            data:data
            });
        })
    .catch(err => {
        res.status(500).json({error: err})
    })

}


exports.getRestaurantsByResId = (req, res) => {
    const { resId } = req.params;
    Restaurants.findById(resId)
        .then(response => {
        res.status(200).json({
            message: "Restaurants Fetched Sucessfully",
            restaurants: response
            })
        })
    .catch(err => {
        res.status(500).json({error: err})
    })
}