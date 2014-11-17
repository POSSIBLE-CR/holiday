var express = require('express');
var geo = express.Router();

geo.get('/geo', function(req, res, next) {
    res.render('/geo');
});

module.exports.geo = geo;
