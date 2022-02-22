const Menu = require('../Models/menuitems');

exports.getMenuItemsByResId = (req, res) => {
    const { resId } = req.params;
    Menu.find({ restaurantId : resId})
        .then(response => {
        res.status(200).json({
            message: "MenuItems Fetched Sucessfully",
            menulist: response
            })
        })
    .catch(err => {
        res.status(500).json({error: err})
    })
}