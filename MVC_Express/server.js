import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { User } from './Models/User.js'   

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

app.post('/form-submit', async (req, res) => {

    try {
        const { name, email, password, contact, age } = req.body;

        const newUser = await User.create({
            name,
            email,
            password,
            contact,
            age,
            createdAt: new Date(),
        });

        console.log('User created:', newUser);
        res.json({ success: true, user: newUser });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });

    }

});

const port = 1000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})