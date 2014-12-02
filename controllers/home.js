var express = require('express');
var home = express.Router();

home.get('/', function(req, res, next) {
    res.render('home');
});

home.get('/geo', function(req, res, next) {
    res.render('/geo');
});

home.get('/map', function(req, res, next) {
    res.render('map');
});

module.exports.home = home;
