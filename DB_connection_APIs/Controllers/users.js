const User = require('../Models/users');

exports.userSignUp = (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    const userObj = new User ({
        email: email ? email : undefined,
        password: password ? password : undefined,
        firstname: firstname ? firstname : undefined,
        lastname: lastname ? lastname : undefined
    });
    
    userObj.save()
        .then(response => {
        res.status(200).json({
            message: "user registered successfully",
            user: response
            })
        })
    .catch(err => {
        res.status(500).json({
            error: err})
    })
}


exports.userLogin = (req, res) => {
    const { email, password } = req.body;

    User.find({
        email,
        password
    })
        .then(response => {
            if(response.length > 0){
                res.status(200).json({
                    message: "user Validation successfully",
                    isAuthenticated: true,
                    user: response
                    })
            }
            else{
                res.status(200).json({
                    message: "user not Validation successfully",
                    isAuthenticated: false,
                    user: response
                })
            }   
        })
    .catch(err => {
        res.status(500).json({
            error: err})
    })
}