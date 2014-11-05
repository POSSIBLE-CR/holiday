var nconf = require('nconf');
var mongoose = require('mongoose');
var db = require('./helpers/db');
var passport = require('passport');

//EXPRESS 
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var multer = require('multer');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var responseTime = require('response-time');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var favicon = require('serve-favicon');
var versionator = require('versionator').create('0.0.1');

var basePath = __dirname;

// configuration
nconf.argv().env();
nconf.file('enviroment', { type:'file', file:'config/' + (nconf.get('NODE_ENV') || 'development') + '.json'});
nconf.load();
nconf.defaults({
    'port':'80'
});

//db.connect();

// setup app
var app = express();

app.set('port', process.env.PORT || nconf.get('port'));
app.set('views', basePath +  '/views');
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(compression({
        threshold: 512
}));
app.use(express.static(basePath + '/public'));
app.use(cookieParser(nconf.get('sessionSecret')));
app.use(methodOverride());

//TODO implement favicon
//app.use(favicon(basePath + '/public/favicon.ico'));

//TODO implement versionator
//app.use(versionator.middleware);

app.use('/', require('./controllers/home').home);

// error handling middleware should be loaded after the loading the routes
if ('development' === app.get('env')) {
    console.log('Starting in DEV mode');
    app.use(responseTime());
    app.use(errorHandler());
    app.use(logger('dev'));
}
else if ('production' === app.get('env')) {
    console.log('Starting in PROD mode');
    app.use(logger('combined'));
    require('./utils/logger');
}

app.listen(app.get('port'), function(){
    console.log('Listening on port ' + app.get('port'));
});