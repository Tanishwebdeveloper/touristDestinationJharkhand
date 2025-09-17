import TokenManagement from "../config/JWT.js";
import User from "../schema/Userschema.js";
const tokenManagement = new TokenManagement();

class AuthorizationMiddleware {
  authmiddleware = async(req, resp, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return resp
          .status(401)
          .json({ success: false, message: "No token provided" });
      } else {
        const decoded = await tokenManagement.verifyToken(token);
        if (!decoded) {
          return resp
            .status(401)
            .json({ success: false, message: "Invalid token" });
        } else {
          req.userid = decoded.id;
          next();
        }
      }
    } catch (error) {
      throw new Error("Error in the auth middleware ");
    }
  };

  // now  this token will help to filter the roles from the backend simply
  authorizemiddleware=async(req,resp,next)=>{
      try {
         // first we will filter the role from the database 
         const user=await User.findById(req.userid);
         if(!user){
            return resp.status(401).json({success:false,message:"User not verified in the authorize middleware"});
         }
         else{
            req.role=user.role;
            next();
         }
      } catch (error) {
          throw new Error("Error in the authrorize middleware ");
      }
  }
}

export default AuthorizationMiddleware;