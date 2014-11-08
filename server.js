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
var User = require('./models/user');

// configuration
nconf.argv().env();
nconf.file('enviroment', { type:'file', file:'config/' + (nconf.get('NODE_ENV') || 'development') + '.json'});
nconf.load();
nconf.defaults({
    'port':'80'
});

db.connect();

// setup app
var app = express();

app.set('port', process.env.PORT || nconf.get('port'));
app.set('views', basePath +  '/views');
app.set('view engine', 'jade');

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
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

// Begin Passport Authentication Code

var fb = nconf.get('facebook'),
    twitter = nconf.get('twitter'),
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy;

// Passport FACEBOOK code
passport.use(new FacebookStrategy({
    clientID: fb.appId,
    clientSecret: fb.appSecret,
    callbackURL: '/auth/facebook/callback' // For security reasons, the redirection URL must reside on the same host that is registered with Facebook.
  },
  function(accessToken, refreshToken, profile, done) {
    
    //console.log(profile);
    //console.log(done);

    User.findOne({ 'socialNetworkID': profile.id }, function(err, foundUser) {
        if (foundUser) {
            done(err, foundUser);
        } else {
            User.addFBUser(accessToken, profile, done);
        }
    });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Passport TWITTER code
passport.use(new TwitterStrategy({
    consumerKey: twitter.consumerKey,
    consumerSecret: twitter.consumerSecret,
    callbackURL: "/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({ 'socialNetworkID': profile.id }, function(err, foundUser) {
        if (foundUser) {
            done(err, foundUser);
        } else {
            User.addFBUser(accessToken, profile, done);
        }
    });
}));


app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/login/chooseAvatar', 
    failureRedirect: '/login' 
}));

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/login/chooseAvatar',
    failureRedirect: '/login' 
}));


// End Passport Authentication Code


app.use('/', require('./controllers/home').home);
app.use('/login', require('./controllers/login').login);



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