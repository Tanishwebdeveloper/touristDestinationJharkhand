import Userservice from "../service/Userservice.js";
import bcrypt from "bcrypt";

const userService = new Userservice();

class Usercontroller {
  registerUser = async (req, resp) => {
    try {
      const { FirstName, LastName, Password, EmailAddress, role } = req.body;

      if (!FirstName || !LastName || !Password || !EmailAddress || !role) {
        return resp
          .status(400)
          .json({ success: false, message: "Fill all the required details" });
      }

      // create the user by  service
      const { token, user } = await userService.createUser(req.body);

      if (user && token) {
        resp.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // only secure in production
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        return resp.status(201).json({
          success: true,
          message: "User created successfully",
          user,
        });
      }
    } catch (error) {
      return resp.status(500).json({ success: false, message: error.message });
    }
  };

  LoginUser = async (req, resp) => {
    try {
      const { EmailAddress, Password } = req.body;

      if (!EmailAddress || !Password) {
        return resp.status(400).json({
          success: false,
          message: "Please provide both email and password",
        });
      }

      // find the user by email
      const user = await userService.verifyUser(EmailAddress);

      if (!user.success) {
        return resp
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      // compare passwords
      const isMatch = await bcrypt.compare(
        Password,
        user.user.Password // hashed password from DB
      );

      if (!isMatch) {
        return resp
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      return resp.status(200).json({
        success: true,
        message: "Login successful",
        user: user.user,
      });
    } catch (error) {
      return resp.status(500).json({ success: false, message: error.message });
    }
  };

  // function in the controller for sending the role to frontend
  verifyrole = async (req, resp) => {
    try {
      if (req.role){
        return resp
          .status(200)
          .json({
            role: req.role,
            message: "role of the user send succesfully ",
            success: true,
          });
      }
      else{
        return resp.status(400).json({message:"role of the user is ont specified"});
      }
        
     
      return;
    } catch (error) {
      throw new Error("Error in the user verify role controller ");
    }
  };
}

export default Usercontroller;