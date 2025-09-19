import UserPayment from "../models/userPaymentSchema.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
class UserPaymentController {
  collectuserdetails = async (req, resp) => {
    try {
      const { name, email, address, cardNumber, expiry, cvv,transactionmode } = req.body;
      if (!name || !email || !address || !cardNumber || !expiry || !cvv) {
        return resp
          .status(400)
          .json({ message: "All feilds are required", success: false });
      }
      // after verification save the entris in the database  for the payment completion
      else {
        // first hash the card number and then save the new hashed card number for secure transaction commited
        const saltrounds = 10;
        const hashedcardNumber = await bcrypt.hash(cardNumber, saltrounds);
        const user = await UserPayment.create({
          name,
          email,
          address,
          cardNumber: hashedcardNumber,
          expiry,
          cvv,
          transactionmode
        });
        // save or create the user
        await user.save();
        return resp
          .status(200)
          .json({ success: true, message: "user created succesfully" });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  notificationsendafterpaymentcompletion = async (req, resp) => {
    // here we will write the logic for sending the email after the user is saved into the database

    try {
      const testAccount = await nodemailer.createTestAccount();
      const { email } = req.params;
      // first check if the email exist in the database or not
      const checkemail = await UserPayment.findOne({email});
      if (checkemail) {
        // send the email to the user
        // connect with the smtp
        const transporter = await nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          auth: {
            user: `${process.env.EMAIL}`,
            pass: `${process.env.PASSWORD}`,
          },
        });

        const info = await transporter.sendMail({
          from: '"Jharkhand Darshan" <jharkhandDarshand@gmail.com>',
          to: `${email}`,
          subject: "Hello ",
          text: "Payment is succesfully Accomplished! ", // plain‑text body
          html: "<b>Payment is succesfully Accomplished!</b>", // HTML body
        });

        return resp
          .status(200)
          .json({
            message: "Payment and transaction commited",
            success: true,
            info,
          });
      } else {
        return resp.status(400).json({
          message: "Not certified user cancel payment declaration",
          success: false,
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export default UserPaymentController;