


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const products = require("./data/products");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// ✅ Connect to MongoDB first before starting the server
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce";

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Backend running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Test route
app.get("/", (req, res) => res.send("API is running..."));

// Products route
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Place Order
app.post("/api/order", (req, res) => {
  const { firstName, lastName, address, cart } = req.body;
  if (!firstName || !lastName || !address) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  console.log("🛒 New Order Received:");
  console.log("Customer:", firstName, lastName);
  console.log("Address:", address);
  console.log("Items:", cart);

  res.json({ message: "Order placed successfully!" });
});



















// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const products = require("./data/products");
// const dotenv = require("dotenv");

// dotenv.config();



// const app = express();
// // const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// //connect MongoDB
// // mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });
// mongoose
//   .connect(process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err.message));

// //Routes
// // const authRoutes = require("./routes/authRoutes");
// // app.use("/api/auth", authRoutes);
// app.use("/api/auth", require("./routes/authRoutes"));

// // ✅ Test route
// app.get("/", (req, res) => res.send("API is running..."));

// app.use(express.json());

// //  Get Products
// app.get("/api/products", (req, res) => {
//   res.json(products);
// });

// //  Place Order
// app.post("/api/order", (req, res) => {
//   const { firstName, lastName, address, cart } = req.body;

//   if (!firstName || !lastName || !address) {
//     return res.status(400).json({ message: "All fields are required!" });
//   }

//   console.log(" New Order Received:");
//   console.log("Customer:", firstName, lastName);
//   console.log("Address:", address);
//   console.log("Items:", cart);

//   res.json({ message: "Order placed successfully!" });
// });


// // ✅ Start server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Backend running at http://localhost:${PORT}`);
// });

