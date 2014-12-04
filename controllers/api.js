var express = require('express');
var api = express.Router();
var messageService = require('./../services/message');

api.post('/message', function(req, res, next) {
    messageService.createMessage(req,res,next);
});

module.exports.api = api;