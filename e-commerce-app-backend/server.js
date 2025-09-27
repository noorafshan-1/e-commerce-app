const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const products = require("./data/products");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


//  Get Products
app.get("/api/products", (req, res) => {
  res.json(products);
});

//  Place Order
app.post("/api/order", (req, res) => {
  const { firstName, lastName, address, cart } = req.body;

  if (!firstName || !lastName || !address) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  console.log(" New Order Received:");
  console.log("Customer:", firstName, lastName);
  console.log("Address:", address);
  console.log("Items:", cart);

  res.json({ message: "Order placed successfully!" });
});

// Start server

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
