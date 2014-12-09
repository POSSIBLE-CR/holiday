var express = require('express');
var api = express.Router();
var messageService = require('./../services/message');

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

module.exports.api = api;