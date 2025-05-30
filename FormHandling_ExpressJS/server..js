import express from 'express'
const app = express();
// we use middleware for form handlind and encoded the url for security.
app.use(express.urlencoded({extended:true}));

// then we use routing and give the routing path and method 'post' in index.html form
app.post('/formsubmit',(req, res)=>{
    res.json({
        message: 'form is submited',
        body: req.body
    }
    )

})

app.get('/', (req, res)=>{
   res.render('index.ejs');
})

const port = 1000;
app.listen(port, ()=>{

})