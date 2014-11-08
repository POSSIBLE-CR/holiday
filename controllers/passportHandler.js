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
        User.findOne({ 'facebook.id': profile.id }, function(err, foundUser) {
            if (foundUser) {
                done(err, foundUser);
            } else {
                User.addFBUser(accessToken, profile, done);
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
        User.findOne({ 'socialNetworkID': profile.id }, function(err, foundUser) {
            if (foundUser) {
                done(err, foundUser);
            } else {
                User.addFBUser(accessToken, profile, done);
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

passportRouter.get('/auth/facebook', passport.authenticate('facebook',{scope: FACEBOOK_PERMISSIONS }));
passportRouter.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/login/chooseAvatar',
    failureRedirect: '/login'
}));

passportRouter.get('/auth/twitter', passport.authenticate('twitter'));

passportRouter.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/login/chooseAvatar',
    failureRedirect: '/login'
}));

module.exports.passportRouter = passportRouter;