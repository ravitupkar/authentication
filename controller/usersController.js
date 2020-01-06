const jwt = require('jsonwebtoken');
const User = require('../model/users');
const appconstants = require('../config/appconstants');

module.exports.createUser = (req, res, next)=>{

    const password = req.body.password;
    const password2 = req.body.password2;

    if(password === password2){

            let newUser = new User({
              name: req.body.name,
              email: req.body.email,
              username: req.body.username,
              password: req.body.password
            });
          
            User.addUser(newUser, (err, user) => {
              if (err) {
                res.json({ success: false, msg: err.message });
              } else {
                res.json({ success: true, msg: 'User registered' });
              }
            });
    }else{
        res.json({status : false, message : 'confirm password does not match'});
    }
}

module.exports.login = (req, res, next)=>{

    const email = req.body.email;
    const password = req.body.password;

    User.getUserByUsername(email, (err, user) =>{
        if(err) res.json({status : false, message : 'Email/Password does not match'});
        if(!user) res.json({status : false, message : 'User does not match'});

        User.comparePassword(password, user.password, (err, isMatch)=>{
            if(err) res.json({status : false, message : 'Email/Password does not match'});
            if(isMatch){
                authuser = {
                    name : user.name,
                    email : user.email,
                    username : user.username
                }
                const token = jwt.sign(authuser, appconstants.secret , { expiresIn: '1h' });
                res.json({status : true, message : 'login successfull', token : token, user : authuser});
            }
        });
    });        
}

module.exports.profile = (req, res, next)=>{
    let user = req.user;
    if(user){
        res.json({status : true, message : 'login successfull', user : {name : user.name, username : user.username, email : user.email}});
    }
}