var express = require('express');
var app = express.Router();
var Message = require('./../models/message');
var messageService = require('./../services/message');

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
        messageService.linkMessage(req.user,req.params.id);
        res.render('friendMessage');
    }
});

module.exports.app = app;