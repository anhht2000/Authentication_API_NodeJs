const express = require('express');
const router = express.Router();
const loginController = require("../app/controllers/LoginController");
const Validator =  require("../app/middlewares/validator");
const handle =  require("../app/middlewares/handleValidate");
//passport
const passport = require("passport");
const passportConfig =  require("../app/middlewares/passport");

// [signUp]
router.post('/signup',Validator.validateBody(Validator.schemas.authenSchema),handle,loginController.signUp.bind(loginController));
// [signIn]
router.get('/signin',function(req,res,next){
  res.setHeader("hihi","100000")
  res.json("OK")
})
router.post('/signin',Validator.validateBody(Validator.schemas.authenSchema),handle,passport.authenticate("local",{session: false}),loginController.signIn.bind(loginController));
//[secret] để giải mã tokens
router.get('/secret',passport.authenticate("jwt",{session: false}),loginController.secret);
// [google]
router.post('/auth/google',passport.authenticate('google-plus-token',{ session: false}),loginController.authGoogle.bind(loginController));
// [facebook]
router.post('/auth/facebook',passport.authenticate('facebook-token',{ session: false}),loginController.authFacebook.bind(loginController));

module.exports = router;
