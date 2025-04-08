const jwt = require('jsonwebtoken')


const authMiddleware = async(req,res,next)=>{
      const {access_Token} = req.cookies;
      if(access_Token){
        const deCodeToken = await jwt.verify(access_Token,process.env.SECRET) ;

        req.myId = deCodeToken.id;
        next();
      }else{
        res.status(400).json({
            error : {
                errMessage : ['Please Login First ']
            }
        })
      }
}

module.exports={
    authMiddleware,
}