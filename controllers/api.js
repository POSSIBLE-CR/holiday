var express = require('express');
var Message = require('./../models/message');
var api = express.Router();

api.post('/message', function(req, res, next) {
    var message = new Message();
    var userMessage = req.param('message');
    var latitude = req.param('latitude');
    var longitude = req.param('longitude');
    if (userMessage && latitude && longitude && (typeof latitude === "number") && (longitude === "number")){
        message.message = userMessage;
        message.location.coordinates.push(longitude);
        message.location.coordinates.push(latitude);
        message.save(function (error, result, numberAffected) {
            if (error){
                console.log(error);
                res.status(500);
            }
            res.status(201).json(result);
        });
    }else {
        res.status(400).send('Bad Request, missing parameters');
    }
});

module.exports.api = api;