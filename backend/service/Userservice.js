import User from "../schema/Userschema.js";
import bcrypt from "bcrypt";
import TokenManagement from "../config/JWT.js";
const tokenManagement = new TokenManagement();

class Userservice {
  createToken = async (userid) => {
    const token = await tokenManagement.generateToken(userid);
    return token;
  };

  createHashedPassword = async (password) => {
    const saltrounds = 10;
    return await bcrypt.hash(password, saltrounds);
  };

  createUser = async (userData) => {
    const { FirstName, LastName, Password, EmailAddress, role } = userData;

    const hashedPassword = await this.createHashedPassword(Password);

    const user = await User.create({
      FirstName,
      LastName,
      EmailAddress,
      Password: hashedPassword,
      role, // optional, schema already has default
    });

    const token = await this.createToken(user._id);
    user.save();
    return { user, token };
  };

  verifyUser = async (email) => {
    const user = await User.findOne({ EmailAddress: email });
    if (!user) {
      return { success: false, message: "User not found" };
    }
    return { success: true, user };
  };
}

export default Userservice;