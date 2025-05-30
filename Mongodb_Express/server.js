import express from 'express'
import mongoose from 'mongoose';

const app = express();
mongoose.connect(
    "mongodb+srv://fahadzaman664:gp56bGZMDU6a9boB@formcluster0.5xvjcfs.mongodb.net/", {dbName: "Nodejs Mastery"}
).then(()=>console.log("mongodb is connected")).catch((err)=> console.log(err));

const port = 1000;

app.get('/', (req, res)=>{

})

app.listen(port , ()=>{
    console.log(`server is running on port ${port}`)
})