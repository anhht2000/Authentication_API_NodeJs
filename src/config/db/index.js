// Tao ket noi den database
const mongoose = require('mongoose');

async function connect(params) {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/shoppee_manage", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Connect succesfully!!')

    }
    catch{
        console.log('Connect fail!!')
    }
}

module.exports = {connect}