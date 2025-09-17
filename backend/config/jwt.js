import jwt from "jsonwebtoken";

class TokenManagement {
  generateToken = (userid) => {
    try {
      return jwt.sign({ id:userid }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  verifyToken = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default TokenManagement;