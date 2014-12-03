var express = require('express');
var home = express.Router();
var Message = require('./../models/message');

home.get('/', function(req, res, next) {
    Message.find().sort({ "created":-1}).limit(20).exec( function(error, results){
        if (error){
            console.log(error);
        }
        res.locals.messages = results || [];
        res.render('home');
    });

});

home.get('/geo', function(req, res, next) {
    res.render('/geo');
});

home.get('/map', function(req, res, next) {
    res.render('map');
});

module.exports.home = home;
