var jwt = require('jsonwebtoken');

module.exports.VerifyToken = async (req,res,next) =>{
    try
    {
        const token = req.headers["x-access-token"];
        var decoded = jwt.verify(token, process.env.SECRETKEY);
        req.userId = decoded.id;
        next();
    }
    catch(error)
    {
     return res.status(501).send({
         "status" : "Fail",
         "message" : "Authorization Error"
     });
    }
    
}