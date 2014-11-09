var express = require('express');
var signup = express.Router();

signup.get('/', function(req, res, next) {
    res.render('signup/login');
});

signup.get('/chooseAvatar', function(req, res, next) {
    res.render('signup/chooseAvatar');
});

module.exports.signup = signup;