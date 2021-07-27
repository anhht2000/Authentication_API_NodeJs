const User = require("../models/Newusers");
const userAccount = require("../models/Users");


class UserController {
    // [get] /me/courses
    async index(req,res,next){
        let user = new User(req.body);
        try{
            let newUser = await User.find({})
            // throw new Error("Loi roi ban oi")
            res.status(201).json(newUser);
        }
        catch(err){
            next(err)
        }
    }
    // [post] /user/save
    save(req,res,next){
        let user = new User(req.value.body); //truyen tu middleware sang
        console.log(user);
        user.save() 
            .then(function(data){
                res.status(201).json(data);
            })
            .catch(err=>next(err));
        
    }
    //[get]One
    getOne(req,res,next){
        let userId = req.value.param.Userid; //bien truyen qua middleware da validate
        User.findOne({_id:userId})
                .then(data=>{
                    res.json({data})
                })
                .catch(err=>next(err))
                
    }
    // save/user/:Userid
    // [put]
    putOne(req,res,next){
        let userId = req.params.Userid;
        let newUser = req.body
        User.findOneAndReplace({_id:userId},newUser)
                .then(data=>{
                    console.log(data);
                    res.status(200).json("Update successfully")
                })
                .catch(err=>next(err))
                
    }
    // [patch]
    patchOne(req,res,next){
        let userId = req.params.Userid;
        let newUser = req.body
        User.findOneAndUpdate({_id:userId},newUser)
                .then(data=>{
                    console.log(data);
                    res.status(200).json("Update successfully")

                })
                .catch(err=>next(err))
                
    }
    //data post relationship
    async newUser(req,res,next){
        let userId = req.params.Userid;
        //create new user
        try{
            const Userinfo = new User(req.body);
            //get userAccount
            const usAcc = await userAccount.findOne({_id:userId});
            //assign  newuser's acc
            Userinfo.account = usAcc;
            //save Userinfo
            await Userinfo.save();
            //push
            console.log(Userinfo._id);
            usAcc.info.push(Userinfo._id);
            //save usAcc
            await usAcc.save();

            res.status(201).json({Userinfo,})
        }
        catch(err){
            next(err)
        }
    }
    //data get
    async getnewUser(req,res,next){
        let userId = req.params.Userid;
        try{
            let userAcc = await userAccount.findOne({_id:userId}).populate('info');
            res.status(201).json({userAcc:userAcc.info,})
        }
        catch(err){
            next(err)
        }
    }
    //data delete
    async deletenewUser(req,res,next){
        let userId = req.value.param.newUserid;
        // xoa newUser
        let user = await User.findOne({_id:userId});
        let account = user.account;
        await user.remove();

        //vi account la 1 mang nhieu phan tu
        account.forEach(async function(item,index){
            //tim ra phan tu la UserAcc cua newUser
            let userAcc = await userAccount.findOne({_id:item});

            let indexId = userAcc.info.indexOf(userId); // lay ra vi tri phan tu cua account 
            userAcc.info.splice(indexId,1);
            //xoa info khoi useAccc
            await userAcc.save();

        })
        res.status(201).json({success:true});
        return
    }
}

module.exports = new UserController();
