// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// move to .env in production
//const JWT_SECRET = "your_jwt_secret";

// ✅ Use environment variable for security
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.json({ message: "Signup successful! Please login." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    //   const token = jwt.sign(
    //     { id: user._id, email: user.email },
    //     JWT_SECRET,
    //     { expiresIn: "1h" }
    //   );

    //   res.json({
    //     message: "Login successful",
    //     token,
    //     user: { firstName: user.firstName, lastName: user.lastName, email: user.email },
    //   });
    // } catch (error) {
    //   res.status(500).json({ message: "Server error" });
    // }
    // ✅ Create JWT (valid for 1 day)
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    // try {
    //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   req.userId = decoded.id;
    //   next();
    // } catch (err) {
    //   return res.status(401).json({ message: "Invalid token" });
    // }
    const decoded = jwt.verify(token, JWT_SECRET); // ✅ uses same key

    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Get user profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error("Profile fetch error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Protected profile route
// router.get("/profile", async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "No token provided" });

//     const decoded = jwt.verify(token, JWT_SECRET);
//     res.json({ message: "Access granted", user: decoded });
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// });

module.exports = router;
