import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import multer from 'multer'
const app = express();
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: 'dicf2gwob',
    api_key: '878736556887681',
    api_secret: 'DpJeDgAlEZV39Rf1U1WmQuXVd2A'
});

app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
    "mongodb+srv://fahadzaman664:gp56bGZMDU6a9boB@formcluster0.5xvjcfs.mongodb.net/", { dbName: "NodejsMasteryCourse" }
).then(() => console.log("mongodb is connected")).catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.render('login.ejs', { error: "" })
})
app.get('/register', (req, res) => {
    res.render('register.ejs')
})

const storage = multer.diskStorage({
    // destination: './public/my-uploads',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const upload = multer({ storage: storage });
const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,  
        required: true,
    },
    password: {
        type: String
    },

    filename: {
        type: String
    },
    public_id: {
        type: String
    },
    imgUrl: {
        type: String
    }
})
const User = mongoose.model("userAuth", userSchema)

// register user with profile image
app.post('/register', upload.single('file'), async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.render('register.ejs', { error: 'User with this email already exists!' });
        }
        if (!req.file) {
            return res.render('register.ejs', { error: "Please select an image to upload." });
        }
        let cloudinaryRes = null;
        if (req.file) {
            // Only upload to Cloudinary if file was provided
            const filepath = req.file.path;
            cloudinaryRes = await cloudinary.uploader.upload(filepath, {
                folder: 'NodeJs Mastery Course'
            });
        }
        const db = await User.create({
            name,
            email,
            password,
            filename: cloudinaryRes ? cloudinaryRes.original_filename : null,
            public_id: cloudinaryRes ? cloudinaryRes.public_id : null,
            imgUrl: cloudinaryRes ? cloudinaryRes.secure_url : null
        })
        res.redirect('/');
    } catch (error) {
        res.status(500).send('internal server error: ' + error.message)
    }
})

// login 
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.render('login.ejs', { error: "no user found, please register first" })
        }
        else if (user.password !== password) {
            res.render('login.ejs', { error: "Invalid email or password!" })
        }
        else {
            res.render('profile.ejs', { user })
        }
    } catch (error) {
        res.status(500).send('internal server error: ' + error.message)
    }
})

// logout
app.post('/logout', (req, res) => {
    res.redirect('/');
})




const port = 2000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})