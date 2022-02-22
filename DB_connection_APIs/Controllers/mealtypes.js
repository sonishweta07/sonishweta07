const MealTypes = require('../Models/mealtypes');

exports.getMealTypes = (req, res) => {
    MealTypes.find()
        .then(response => {
        res.status(200).json({
            message: "MealTypes Fetched Sucessfully",
            mealtypes: response
          })
        })
    .catch(err => {
        res.status(500).json({error: err})
    })
}   