var express = require('express');
var home = express.Router();

home.get('/', function(req, res, next) {
    res.render('home');
});

module.exports.home = home;
