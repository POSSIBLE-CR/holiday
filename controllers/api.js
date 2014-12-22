var express = require('express');
var api = express.Router();
var messageService 	= require('./../services/message');
var userService		= require('./../services/user');

api.post('/messages', function(req, res, next) {
    messageService.createMessage(req,res,next);
});

api.get('/messages/user', function(req, res, next) {
	messageService.getUserMessages(req,res,next);
});

api.get('/messages/:id', function(req, res, next) {
    messageService.getMessageById(req,res,next);
});

api.get('/messages', function(req, res, next) {
    messageService.getMessages(req,res,next);
});

api.get('/users', function(req, res, next) {
    userService.getUsers(req,res,next);
});

api.get('/users/:id', function(req, res, next) {
    userService.getUserById(req,res,next);
});

module.exports.api = api;