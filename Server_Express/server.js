import express from 'express'

const app = express();
// routing
app.get('/', (req,res)=>{
    res.send('you are calling from home')
})

app.get('/about', (req,res)=>{
    res.send('you are calling from about')
})

const port = 2000;
app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})
