require('dotenv').config();
const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const app = express();
const path = require('path');
const route = require('./route');
const db = require("./config/db");
//apply middleware để render dữ liệu từ form post lên
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

db.connect();


//cors 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header( "Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE" );
  // res.header( "Access-Control-Max-Age", "300" );
  next();
})
//
const server = require('http').Server(app);
// const io = require("socket.io")(server);
server.listen(process.env.PORT || 3000);

//handle throw ERROR
app.use((err,req,res,next)=>{
    const error = app.get("env") === "development" ? err : {};
    const status = err.status || 500 ;
    //response to client
    return res.status(status).json({
        error:{
            message: error.message
        }
    })
})


//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'resource','views'));
app.use(expressLayouts);

//nhung file tinh
app.use(express.static(path.join(__dirname, 'public')));


route(app);
