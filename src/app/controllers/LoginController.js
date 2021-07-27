const User = require("../models/Newusers");
const userAccount = require("../models/Users");
var jwt = require('jsonwebtoken');


class LoginController {
    encode(userId){
      return jwt.sign({
        sub: userId,
        name: "tuananh",
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 3),
      },process.env.ACCESS_TOKEN)
    }
    //signUp
    async signUp(req,res,next){
      const {username,password,name} = req.value.body;
      //check username is already
      try{
        let account = await userAccount.findOne({username:username});
        if(account){
          res.status(403).json({error:{message:"Your account existed!"}})
          return;
        }
        
        let newAccount = new userAccount({username,password,name});
        newAccount.save();

        //encode và trả về cho client
        const token = this.encode(newAccount._id);
        res.setHeader("Authorization",token);

        return res.status(200).json({success:true,});
        
      }
      catch(err){
        next(err);
      }

    }
    //signIn
    async signIn(req,res,next){
      //encode và trả về cho client vì nó đã có 1 middleware đăng nhập ở trước r
      const token = this.encode(req.user._id);
      res.setHeader("Authorization",token);

      return res.status(200).json({success:true,});
      
    }
    //secret
    async secret(req,res,next){
        console.log("Cal to secret",req.user);
        return res.status(200).json({success:true,});

    }
    //auth gg
    async authGoogle(req,res,next){
      const token = this.encode(req.user._id); //cái req.user là truyền từ middleware lên
      res.setHeader("Authorization",token);

      return res.status(200).json({success:true,});
      
    }
    //auth fb
    async authFacebook(req,res,next){
      const token = this.encode(req.user._id); //cái req.user là truyền từ middleware lên
      res.setHeader("Authorization",token);

      // console.log("OK",req.user);
      return res.status(200).json({success:true,});
    }
    
}

module.exports = new LoginController();
