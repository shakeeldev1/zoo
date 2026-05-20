import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAllUsers=async(req,res)=>{
    try {
        const users = await User.find().select("-password -otp -otpExpires");
        if (!users) {
            return res.status(404).json({
                success: false,
                message: "No users found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // ================= CHECK USER =================
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // ================= CHECK OTP =================
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ================= CHECK EXPIRY =================
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // ================= CLEAR OTP =================
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // ================= GENERATE TOKEN =================
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            });
        }

        // =========================
        // FIND USER
        // =========================

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        // =========================
        // CHECK PASSWORD
        // =========================

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // =========================
        // GENERATE OTP
        // =========================

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // OTP Expiry Time
        const otpExpiry = Date.now() + 10 * 60 * 1000;

        // SAVE OTP IN DATABASE
        user.otp = otp;
        user.otpExpires = otpExpiry;

        await user.save();

        // =========================
        // CREATE TRANSPORTER
        // =========================

        const transporter = nodemailer.createTransport({
            service: "gmail",

            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // =========================
        // SEND OTP EMAIL
        // =========================

        await transporter.sendMail({
           from: `"Zoo App" <${process.env.EMAIL_USER}>`,

            to: user.email,

            subject: "Zoo App Login OTP",

            html: `
                <div style="
                    font-family: Arial;
                    padding: 20px;
                ">

                    <h2>Login Verification</h2>

                    <p>Hello ${user.name},</p>

                    <p>Your OTP code is:</p>

                    <h1 style="
                        color: blue;
                        letter-spacing: 5px;
                    ">
                        ${otp}
                    </h1>

                    <p>
                        This OTP will expire in 
                        <b>10 minutes</b>.
                    </p>

                    <p>
                        If you did not request this login,
                        please ignore this email.
                    </p>

                    <br/>

                    <p>
                        Regards,<br/>
                        Zoo App Team
                    </p>

                </div>
            `,
        });


        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7 days" }
        );

      return res.status(200).json({
  success: true,
  message: "Login successful. OTP sent to email.",
  token,
  otp, // ⚠️ add this for frontend modal use only
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

export const verifyUser = async (req, res) => {
  try {

    return res.status(200).json({
      success: true,
      userId: req.userId,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
};

