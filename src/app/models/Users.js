const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    username : {
        type: String,
        lowercase:true
    },
    password : {type: String},
    name: {type: String},
    authGoogleID:{
      type:String,
      default:null,
    },
    authFacebookID:{
      type:String,
      default:null,
    },
    authType:{
      type:String,
      enum:["local","google","facebook"], //chỉ cho nó chọn 1 trong các kiểu trong mảng kia thôi
      default:"local"
    },
    info: [{
        type : Schema.Types.ObjectId,
        ref: 'Newuser',
    }]
},{
    timestamps: true,
});

//thuc hien ma hoa truowc khi save
UserSchema.pre("save",async function(next){
  try{
    if(this.authType !== "local") return next() //neu truong authType k phai la local thi bo qua luon 
    //genarate salt
    const salt = await bcrypt.genSalt(10);
    console.log(this);
    //hash
    let newPass = await bcrypt.hash(this.password,salt);
    this.password = newPass; //this chinh la doi tuong goi den no
    next()
  }
  catch(error){
    next(error)
  }
})
//xay dung 1 ham de duoc goi.cai nay phai duoc goi moi chay
UserSchema.methods.isValidPassword = async function(newPass){
  try {
    return await bcrypt.compare(newPass,this.password)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = mongoose.model('User', UserSchema,'users') 