var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamp = require('./../helpers/timestamp');

var UserSchema = new Schema({
    name : {
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    accessToken: { type: String },
    expires: { type: Date },
    gender: { type: String },
    email: { type: String },
    timezone: { type: String },
    locale: { type: String },
    verified: { type: Boolean },
    facebook : {
        id : { type: String, unique : true }
    },
    twitter : {
        id : { type: String, unique : true }
    }
});

UserSchema.plugin(timestamp, { useVirtual: false });

UserSchema.statics.addFBUser = function(accessToken, profile, cb) {
    var user = new User({
        facebook: {
            id: profile._json.id
        },
        name: {
            first: profile._json.first_name,
            last: profile._json.last_name
        },
        accessToken: accessToken,
        gender: profile._json.gender,
        email: profile._json.email,
        timezone: profile._json.timezone,
        locale: profile._json.locale,
        verified: profile._json.verified
    });

    user.save(function(err) {
        cb(err, user);
    });
};

UserSchema.index({ socialNetworkId: 1});

module.exports = User = mongoose.model('User', UserSchema);