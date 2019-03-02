var mongoose = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    phoneNo: String,
    address: String,
    bloodGrp: String,
    UID: String,
    previousRecord: String
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);