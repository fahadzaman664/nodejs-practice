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
    res.render('index.ejs', { imgurl: null })
})


const storage = multer.diskStorage({
   // destination: './public/my-uploads',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const upload = multer({ storage: storage });

const fileSchema = mongoose.Schema({
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
const image = mongoose.model("cloudinary", fileSchema)
// upload file
app.post('/fileupload', upload.single('file'), async (req, res) => {
    try {
        const filepath = req.file.path;

        const cloudinaryRes = await cloudinary.uploader.upload(filepath, {
            folder: 'NodeJs Mastery Course'
        })
        const db = await image.create({
            filename: cloudinaryRes.original_filename,
            public_id: cloudinaryRes.public_id,
            imgUrl: cloudinaryRes.secure_url
        })
        res.render('index.ejs', { imgurl: cloudinaryRes.secure_url });

    } catch (error) {

    }

})



const port = 2000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})