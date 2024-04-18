const path = require("path")
const express = require('express');
//express app
const app = express();

//  listen for requests
//  returns an instance of a server like const server = http.createServer((req, res)...
app.listen(3000);

// express sends status code to browser, and sets header
app.get('/', (req, res)=> {
    //res.send('<p>home pages</p>');
    res.sendFile(path.join( __dirname , "./views/index.html"));
});
app.get('/about', (req, res)=> {
    res.sendFile(path.join(__dirname, "./views/about.html"));

});

//redirect
app.get('/about-us', (req, res)=> {
    res.redirect('/about');

});

//404, needs to be in the bottom
app.use((req, res)=> {
    res.sendFile(path.join(__dirname, "./views/404.html"));
})