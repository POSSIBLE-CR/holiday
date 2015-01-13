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
    socialNetwork : { type: String, required: true },
    avatar : { type: String },
    receivedMessages : [{ type: Schema.ObjectId, ref: 'Message' }]
});

UserSchema.statics.addUser = function(profile, accessToken,  cb ) {
    var random_avatar = (parseFloat((Math.random() * 10)).toFixed()).toString(); //From 1-9, just 9 avatar available for know
    var user = new User({
        id : profile.id,
        socialNetwork : profile.provider,
        username: profile.username || '',
        name: profile.displayName,
        accessToken: accessToken,
        avatar : random_avatar,
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

UserSchema.plugin(timestamp, { useVirtual: false });

module.exports = User = mongoose.model('User', UserSchema);