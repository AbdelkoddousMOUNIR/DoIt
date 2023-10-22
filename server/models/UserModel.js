const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,
        min: 3,
        max: 10,
    },
    Gmail: {
        type: String,
        required: true,
        max: 30,
        unique : true
    },
    Password: {
        type: String,
        min: 8,
        required : true
    },
    ProfileImg: {
        type: String,
    },
    Cloudinary_id: {
        type: String,
    }
})
module.exports = mongoose.model("User" , UserSchema)