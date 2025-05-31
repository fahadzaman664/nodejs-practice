import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { userRegister } from './controllers/UserRegister.js';
const app = express();
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(
    "mongodb+srv://fahadzaman664:gp56bGZMDU6a9boB@formcluster0.5xvjcfs.mongodb.net/", { dbName: "NodejsMasteryCourse" }
).then(() => console.log("mongodb is connected")).catch((err) => console.log(err));


app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/form-submit', userRegister)

const port = 1000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})