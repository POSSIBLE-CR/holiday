var express = require('express');
var nconf = require('nconf');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var passportRouter = express.Router();
var User = require('./../models/user');

var fb = nconf.get('facebook'),
    twitter = nconf.get('twitter');
var FACEBOOK_PERMISSIONS = ['publish_actions','email','user_friends'];

// Passport FACEBOOK code
passport.use(new FacebookStrategy({
        clientID: fb.appId,
        clientSecret: fb.appSecret,
        callbackURL: '/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({ 'id': profile.id }, function(err, foundUser) {
            if (foundUser) {
                done(err, foundUser);
            } else {
                User.addUser(profile, {token: accessToken} , done);
            }
        });
    })
);

// Passport TWITTER code
passport.use(new TwitterStrategy({
        consumerKey: twitter.consumerKey,
        consumerSecret: twitter.consumerSecret,
        callbackURL: "/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
        User.findOne({ 'id': profile.id }, function(err, foundUser) {
            if (foundUser) {
                done(err, foundUser);
            } else {
                User.addUser( profile, {token : token, tokenSecret : tokenSecret}, done);
            }
        });
    })
);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passportRouter.get('/auth/twitter', passport.authenticate('twitter'));

passportRouter.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/auth/loggedin',
    failureRedirect: '/'
}));

passportRouter.get('/auth/facebook', passport.authenticate('facebook',{scope: FACEBOOK_PERMISSIONS }));

passportRouter.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/auth/loggedin',
    failureRedirect: '/'
}));

passportRouter.get('/auth/loggedin', function (req, res) {
    if (req.user){       
        res.cookie('possible.holiday.socialNetwork', req.user.socialNetwork);
        if (req.session.messageId){
            return res.redirect('/message/' + req.session.messageId);
        }else {
            return res.redirect('/createmessage');
        }
    }else{
        return res.redirect('/');
    }    
});

passportRouter.get('/twitter/tweet', function (req, res) {
  makeTweet(function (error, data) {
    if(error) {
      console.log(require('sys').inspect(error));
      res.end('bad stuff happened');
    } else {
      console.log(data);
      res.end('go check your tweets!');
    }
  });
});

function makeTweet(cb, status) {
  oa.post(
    "https://api.twitter.com/1.1/statuses/update.json"
  , user.token
  , user.tokenSecret
  , {"status": "test " }
  , cb
  );
}

module.exports.passportRouter = passportRouter;