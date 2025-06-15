
import { config } from 'dotenv';
config({path:'.env'})

import express from 'express'
import mongoose from 'mongoose';

import router from './Routes/userrouter.js';
import cors from 'cors';
import productRouter from './Routes/productRouter.js';
import cartrouter from './Routes/cartRouter.js';

const app = express();
app.use(cors());

app.use(express.json());

// .env setup , here we give the path

// user router
app.use('/api/user', router)

// product router
app.use('/api/product', productRouter)

// cart router
app.use('/api/cart', cartrouter)

app.get('/',(req, res) =>{
  res.json({message:'your are in home page'})
});

// to use env variables we use process.env.variableinenv
mongoose.connect(
    process.env.MONGO_URI
 , { dbName: "NodejsMasteryCourse_E_Commerce_API" }
).then(() => console.log("mongodb is connected")).catch((err) => console.log(err));



const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})