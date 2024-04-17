const http = require('http');
const fs = require('fs');
//create server method takes in a callback function.
//call back function get called everytime a request comes into the server
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    

    // set header content type

    //res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Type', 'text/html');

    const data = fs.readFile('./views/index.html', (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            //res.write(data);
            res.end(data);
        }
    });

});

//enable the server to listen for requests
//port arguement is required. local host is implicit
server.listen(3000, 'localhost', () => {
    console.log('listening on port 3000');
});

