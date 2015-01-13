/**
 * Handle the user endpoints
 * @module services/user
 */

var User = require('./../models/user');
var networkUtils = require('./../utils/network');
var async = require('async');

module.exports.getUserById = function(req, res, next) {
        User.findById(req.params.id, function(error, result){
        if (error){
            console.log(error);
            res.sendStatus(500);
        }else{
            res.status(200).json(result || {});
        }
    });    
};

module.exports.getUsers = function(req, res, next) {
    User.find().sort({ "created":-1}).limit(200).exec( function(error, results){
        if (error){
            console.log(error);
            res.sendStatus(500);
        }else{
            res.status(200).json(results || []);
        
        }
    });    
};