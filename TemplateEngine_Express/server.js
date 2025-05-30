import express from 'express'

const app = express();
// Set the view engine to ejs
app.set('view engine', 'ejs');
let products =[
        {title: "iphone",
        price : 33333 
        }
    ]

app.get('/', (req, res)=>{
    

  let name = 'fahad'
    res.render('index.ejs' , {name, products})

})

const port = 1000;
app.listen(port, ()=>{
    console.log(`port is running om &{port}`);
})