// // import userModel from "../models/userModel.js";
// // import jwt from "jsonwebtoken";
// // import bcrypt from "bcrypt";
// // import validator from "validator";

// // // login user

// // const loginUser = async (req, res) => {
// //   const { email, password } = req.body;
// //   try {
// //     const user = await userModel.findOne({ email });
// //     if (!user) {
// //       return res.json({ success: false, message: "User Doesn't exist" });
// //     }
// //     const isMatch =await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.json({ success: false, message: "Invalid Credentials" });
// //     }
// //     const role=user.role;
// //     const token = createToken(user._id);
// //     res.json({ success: true, token,role });
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: "Error" });
// //   }
// // };

// // // Create token

// // const createToken = (id) => {
// //   return jwt.sign({ id }, process.env.JWT_SECRET);
// // };

// // // register user

// // const registerUser = async (req, res) => {
// //   const { name, email, password } = req.body;
// //   try {
// //     // checking user is already exist
// //     const exists = await userModel.findOne({ email });
// //     if (exists) {
// //       return res.json({ success: false, message: "User already exists" });
// //     }

// //     // validating email format and strong password
// //     if (!validator.isEmail(email)) {
// //       return res.json({ success: false, message: "Please enter valid email" });
// //     }
// //     if (password.length < 8) {
// //       return res.json({
// //         success: false,
// //         message: "Please enter strong password",
// //       });
// //     }

// //     // hashing user password

// //     const salt = await bcrypt.genSalt(Number(process.env.SALT));
// //     const hashedPassword = await bcrypt.hash(password, salt);

// //     const newUser = new userModel({
// //       name: name,
// //       email: email,
// //       password: hashedPassword,
// //     });

// //     const user = await newUser.save();
// //     const role=user.role;
// //     const token = createToken(user._id);
// //     res.json({ success: true, token, role});
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: "Error" });
// //   }
// // };

// // export { loginUser, registerUser };

// import userModel from "../models/userModel.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import validator from "validator";

// /* =========================
//    TOKEN CREATION
// ========================= */
// const createToken = (id) => {
//   return jwt.sign(
//     { id },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" } // token expiry added
//   );
// };

// /* =========================
//    LOGIN USER
// ========================= */
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // validation
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     // check user
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // password check
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // token
//     const token = createToken(user._id);

//     res.status(200).json({
//       success: true,
//       token,
//       role: user.role,
//     });

//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error during login",
//     });
//   }
// };

// /* =========================
//    REGISTER USER
// ========================= */
// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // validation
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // email format
//     if (!validator.isEmail(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter a valid email",
//       });
//     }

//     // password strength
//     if (password.length < 8) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be at least 8 characters",
//       });
//     }

//     // check existing user
//     const exists = await userModel.findOne({ email });
//     if (exists) {
//       return res.status(409).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     // hashing password
//     const saltRounds = Number(process.env.SALT) || 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // create user
//     const newUser = new userModel({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     const user = await newUser.save();

//     // token
//     const token = createToken(user._id);

//     res.status(201).json({
//       success: true,
//       token,
//       role: user.role,
//     });

//   } catch (error) {
//     console.error("Register Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error during registration",
//     });
//   }
// };

// export { loginUser, registerUser };

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

/* =========================
   TOKEN CREATION
========================= */
const createToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* =========================
   LOGIN USER
========================= */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = createToken(user._id);

    res.status(200).json({
      success: true,
      token,
      role: user.role,
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

/* =========================
   REGISTER USER
========================= */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const saltRounds = Number(process.env.SALT) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      token,
      role: user.role,
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

export { loginUser, registerUser };
