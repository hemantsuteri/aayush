import 'dotenv/config';
import jwt from "jsonwebtoken";

const secret = process.env.USER_SECRET;

const userauth = async(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(token){
            const decodedData = jwt.verify(token,secret);
            req.userId = decodedData?.id;
        }
        next();
    }catch(err){
        console.log(err)
    }
}


export default userauth;