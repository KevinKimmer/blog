const http = require('http');
//create server method takes in a callback function.
//call back function get called everytime a request comes into the server
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    

    // set header content type

    //res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Type', 'text/html');

    res.write('<head><link rel=:"stylesheet"  href="#"></head>');
    res.write('<p>hola</p>');
    res.write('<p>amigos</p>');
    res.end();
});

//enable the server to listen for requests
//port arguement is required. local host is implicit
server.listen(3000, 'localhost', () => {
    console.log('listening on port 3000');
});