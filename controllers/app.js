var express = require('express');
var app = express.Router();
var Message = require('./../models/message');

app.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('map');
    }else{
        Message.find().sort({ "created":-1}).limit(20).exec( function(error, results){
            if (error){
                console.log(error);
            }
            res.locals.messages = results || [];
            res.render('home');
        });
    }
});

app.get('/map', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
    }else{
        res.render('map');
    }
});

app.get('/createmessage', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
    }else{
        res.render('createMessage');
    }
});

app.get('/message/:id', function(req, res, next) {
	if (!req.isAuthenticated()) {
        res.redirect('/'+req.params.id);
    }else{
        res.render('friendMessage');
    }
});

app.get('/:id', function(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('message/:id');
    }else{
        Message.find().sort({ "created":-1}).limit(20).exec( function(error, results){
            if (error){
                console.log(error);
            }
            res.locals.messages = results || [];
            res.render('home');
        });
    }
});

module.exports.app = app;