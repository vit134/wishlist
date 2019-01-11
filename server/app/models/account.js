var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    country: String,
    city: String,
    phone: Number,
    date_of_birth: Date,
    online: {type: Boolean, default: false},
    last_login: Date,
    was_register: { type: Date, default: Date.now },
    is_activate: { type: Boolean, default: false }
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);