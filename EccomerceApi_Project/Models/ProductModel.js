import mongoose from "mongoose"

// dynamic schema , whenever field comes from req.body
// mean any field can pass
const productSchema = mongoose.Schema({

},{strict:false});

export const Product = mongoose.model("Product", productSchema);