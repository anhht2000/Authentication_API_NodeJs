const userRoute = require("./users");
const loginRoute = require("./logins");

function route(app) {
    //user
    app.use('/user',userRoute)
    //sign
    app.use('/sign',loginRoute);
    //test
    // app.get('/test',function(req,res,next){
    //   res.json("OKs")
    // });
    app.post('/test',function(req,res,next){
      res.json(req.body)
    });
    app.get("/",function(req,res,next){
      res.send("this is home")
    })

}

module.exports = route;
