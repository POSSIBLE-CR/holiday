var express = require('express');
var app = express.Router();
var Message = require('./../models/message');
var User = require('./../models/user');
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
        
        /*Message.findOne({"user" : req.user._id}).sort({"created":-1}).limit(1).exec(function(error, result){
            if (error){
                console.log(error);
            }
            res.locals.userInfo = result || [];
            res.render('map');
        });*/

        Message.find().sort({ "created":-1}).limit(20).exec( function(error, results){
            if (error){
                console.log(error);
            }
            res.locals.messages = results || [];
            res.render('map');
        });

    }
});

app.get('/createmessage', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
    }else{
        res.render('createMessage');
    }
});

/*app.get('/message/:id', function(req, res, next) {
	if (!req.isAuthenticated()) {
        req.session.messageId = req.params.id;
        res.redirect('/?showLoginMessage=true');
    }else{
        messageService.linkMessage(req.user,req.params.id);
        res.render('friendMessage');
    }
});*/

module.exports.app = app;