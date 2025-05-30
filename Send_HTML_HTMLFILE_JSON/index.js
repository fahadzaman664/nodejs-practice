import express from 'express'
import path from 'path'

const app = express();

app.get('/', (req, res) => {
    let success = true;
    const products = [
        {
            title: 'iphone',
            price: '230000'

        },
        {
            title: 'samsung',
            price: '222222'
        }
    ]

   const productTitles = products.map(product => ({
  title: product.title,
  price: product.price
}));

    // res.json({
    //     message: 'data is fetched',
    //     products: products,
    //     success: success,
    //     arrayofproducts : productTitles
        
    // })

    // sending html file

    const dir = path.resolve(); // current path
    const pathUrl = path.join(dir , '/index.html') // join file path with current to send a file
    res.sendFile(pathUrl);
})


const port = 4000;
app.listen(port, () => {


})

