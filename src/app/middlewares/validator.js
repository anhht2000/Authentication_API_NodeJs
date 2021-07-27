//validate
const Joi = require('joi');

var Validator = {
    //body
    validateBody:function(schema){
        return function(req,res,next){
            const validateResult = schema.validate(req.body);
            // console.log(validateResult.value);

            if(validateResult.error){
                req.message = validateResult.error.details[0].message;
            }
            else{
                if(!req.value) req.value={}; 
                req.value.body = validateResult.value;
            }
            next();
        }
    },
    //params
    validateParam: function(schema,fieldName){
        return function(req,res,next){
            // console.log("schema",req.params);
            const validateResult = schema.validate({Userid: req.params[fieldName]});

            //neeus co loi thi no se them 1 truong error
            if(validateResult.error){
                // console.log(validateResult.error.details[0].message);
                req.message = validateResult.error.details[0].message
                // return res.status(400).json(validateResult.error);
            }
            else{
                if(!req.value) req.value={}; 
                if(!req.value.param) req.value.param={}; //cai nay chu yeu la de gan req.value={param:{}}
                
                req.value.param[fieldName] = req.params[fieldName]
            }
            next();
        }
    },
    schemas:{
        IdSchema : Joi.object().keys({
            Userid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        }),
        bodySchema: Joi.object().keys({
            email: Joi.string().email().required(),
            phoneNumber: Joi.string().min(1).max(12).required(),
            address: Joi.string(),
        }),
        authenSchema: Joi.object().keys({
            username: Joi.string().min(4).max(20).required(),
            password: Joi.string().min(1).max(12).required(),
            name: Joi.string().min(1).max(12),
        }),
    }

}

module.exports = Validator;