var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamp = require('./../helpers/timestamp');

var UserSchema = new Schema({
    name : { type: String, required: true },
    username : { type: String },
    displayName : { type: String },
    accessToken: { type:Schema.Types.Mixed, 'default': {} },
    expires: { type: Date },
    gender: { type: String },
    email: { type: String },
    timezone: { type: String },
    locale: { type: String },
    verified: { type: Boolean },
    id : { type: String, unique : true },
    socialNetwork : { type: String, required: true }
});

UserSchema.plugin(timestamp, { useVirtual: false });

UserSchema.statics.addUser = function(profile, accessToken,  cb ) {
    var user = new User({
        id : profile.id,
        socialNetwork : profile.provider,
        username: profile.username || '',
        name: profile.displayName,
        accessToken: accessToken,
        gender: profile.gender
    });

    if (profile.provider==='facebook'){
        user.email = profile._json.email;
        user.timezone = profile._json.timezone;
        user.locale = profile._json.locale;
    }

    user.save(function(err) {
        cb(err, user);
    });
};

UserSchema.index({ 'id' : 1});

module.exports = User = mongoose.model('User', UserSchema);