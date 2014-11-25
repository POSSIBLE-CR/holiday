/**
 * Handle the message endpoints
 * @module services/message
 */

var Message = require('./../models/message');
var networkUtils = require('./../utils/network');

/***
 * Parse the request and save the message on the DB
 * @param req {object} Express req
 * @param res {object} Express res
 * @param next {object} Express next
 */
module.exports.createMessage = function createMessage(req, res, next) {
    var message = new Message();
    var userMessage = req.param('message');
    var longitude = parseFloat(req.param('longitude'));
    var latitude = parseFloat(req.param('latitude'));
    if (req.user && userMessage && latitude && longitude && (typeof latitude === "number") && (typeof longitude === "number")){
        message.message = userMessage;
        message.location.coordinates.push(longitude);
        message.location.coordinates.push(latitude);
        var user = req.user;
        message.userSocialNetwork = user.socialNetwork;
        message.userDisplayName = user.name;
        message.userSocialNetworkId = user.id;
        message.user = user._id;
        message.ip = networkUtils.getIpAddress(req);
        if (req.param('country')){
            message.country = req.param('country');
        }
        if (req.param('countryCode')){
            message.countryCode = req.param('countryCode');
        }
        if (req.param('city')){
            message.city = req.param('city');
        }
        message.save(function (error, result, numberAffected) {
            if (error){
                console.log(error);
                res.sendStatus(500);
            }else {
                res.status(201).json(result);
            }
        });
    }else {
        res.status(400).send('Bad Request, missing parameters');
    }
};