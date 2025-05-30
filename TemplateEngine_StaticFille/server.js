import express from 'express'
import path from 'path'

const app = express();
// Middleware between index.ejs and style.css
app.use(express.static(path.join(path.resolve(), 'public')));
let products = [
    {
        title: "iphone",
        price: 33333
    }
]

app.get('/', (req, res) => {


    let name = 'fahad'
    res.render('index.ejs', { name, products })

})

const port = 2000;
app.listen(port, () => {
    console.log(`port is running om ${port}`);
})