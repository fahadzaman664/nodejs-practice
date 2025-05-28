import http from 'http'

const server = http.createServer((req, res) => {
    if (req.url=== '/fahad') {
         res.end('welcome to node js leaning');
    }
    else if (req.url=== '/zaman') {
        res.end('welcome zaman');
    }
    else {
         res.end('invalid , please send a valid adress');

    }
})

const port = 1000;
server.listen(port, () => {
    console.log(`server is running on port ${port}`)
})