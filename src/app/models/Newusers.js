const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewUserSchema = new Schema({
    address : {
        type: String
    },
    phoneNumber : {
        type: String
    },
    email: {
        type: String
    },
    account: [{
        type : Schema.Types.ObjectId,
        ref: 'User',
    }]
})

module.exports = mongoose.model('Newuser',NewUserSchema,'newusers');