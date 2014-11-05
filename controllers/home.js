var express = require('express');
var home = express.Router();

home.get('/', function(req, res, next) {
    res.send('hello world');
});

module.exports.home = home;