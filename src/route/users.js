const express = require('express');
const router = express.Router();
const userController = require("../app/controllers/UserController");
const Validator =  require("../app/middlewares/validator");
const handle =  require("../app/middlewares/handleValidate");

// [get]
router.get('/save',userController.index)
// [post]
router.post('/save',Validator.validateBody(Validator.schemas.bodySchema),userController.save)
// /save/:Userid
// [get]
router.get("/save/:Userid",Validator.validateParam(Validator.schemas.IdSchema,"Userid"),handle,userController.getOne)
// [put  ] la thay the toan bo
router.put("/save/:Userid",userController.putOne)
// [patch ] la sua doi
router.patch("/save/:Userid",userController.patchOne)
//data relationshio
    // [get ]
    router.get("/save/:Userid/newUser",userController.getnewUser)
    //post
    router.post("/save/:Userid/newUser",userController.newUser)
    //delete
    router.delete("/save/:newUserid/newUser",Validator.validateParam(Validator.schemas.IdSchema,"newUserid"),handle,userController.deletenewUser)



module.exports = router;
