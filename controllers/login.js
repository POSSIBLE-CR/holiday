var express = require('express');
var login = express.Router();

login.get('/', function(req, res, next) {
    res.render('login');
});

login.get('/chooseAvatar', function(req, res, next) {
    res.render('chooseAvatar');
});

module.exports.login = login;