// xu ly loi cua validate 
module.exports = function(req,res,next){
    if(req.message){
        // console.log(req.message);
        res.status(401).json(req.message)
        return
    }
    else{
        next();
    }
}