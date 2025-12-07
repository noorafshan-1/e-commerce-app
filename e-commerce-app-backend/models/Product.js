import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});

export default mongoose.model("Product", productSchema);



// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   }
// });

// export default mongoose.model("Product", productSchema);

