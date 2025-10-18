import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    // check if user already registered
    const checkRegistrationStatus = await User.findOne({ email });
    if (checkRegistrationStatus) {
      return res.status(409).json({
        status: false,
        message: "User already registered",
      });
    }

    // hash password
    const hashPassword = bcryptjs.hashSync(password, 10);

    // create new user
    const newRegistration = new User({
      name,
      email,
      password: hashPassword,
    });

    // save new user
    await newRegistration.save();

    // success response
    res.status(200).json({
      status: true,
      message: "Registration success",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        status: false,
        message: "Invalid login credentials.",
      });
    }

    // check password
    const isVerifyPassword = await bcryptjs.compare(password, user.password);
    if (!isVerifyPassword) {
      return res.status(403).json({
        status: false,
        message: "Invalid login credentials.",
      });
    }

    // remove password before sending response
    const userData = user.toObject();
    delete userData.password;

    // create jwt token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // success response
    res.status(200).json({
      status: true,
      message: "Login success.",
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};