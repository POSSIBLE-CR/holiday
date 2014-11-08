var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name : {
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    accessToken: String,
    expires: Date,
    gender: String,
    email: String,
    timezone: String,
    locale: String,
    verified: Boolean,
    socialNetwork: String,
    socialNetworkID: String 
});

UserSchema.static('addFBUser', function(accessToken, profile, cb) {
    var user = new User({
        name: {
            first: profile._json.first_name,
            last: profile._json.last_name
        },
        //accessToken: profile._json.accessToken,
        gender: profile._json.gender,
        //email: profile._json.email,
        timezone: profile._json.timezone,
        locale: profile._json.locale,
        verified: profile._json.verified,
        //birthday: profile._json.birthday,
    });

    user.save(function(err) {
        console.log("------------------------------------------------");
        console.log(user);
        cb(err, user);
    });

});

module.exports = User = mongoose.model('User', UserSchema);