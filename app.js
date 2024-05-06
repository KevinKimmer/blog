const path = require("path")
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
//express app
const app = express();

// connect to mongodb
const dbURI = "mongodb://kevin:GHrEjf4KTPQf7@192.168.1.3:27017/blogs?directConnection=true";
const intialDbConnection = async () => {
    try {
      await mongoose.connect(dbURI);
      console.log("db connected");
      
    }
    catch (error) {
      console.error(error);
    }
  }
  
  intialDbConnection()
    //  listen for requests
    //  returns an instance of a server like const server = http.createServer((req, res)...
    .then((result) => app.listen(3000));


app.set('view engine','ejs');
//if views folder was "myviews instead"
//app.set('views', 'myviews');



// middleware & static files
app.use(express.static('public'));

//mongoose and mango sanbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
})

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

app.use((req, res, next) => {
    console.log('In the next middleware');
    
    next();
});

// express sends status code to browser, and sets header
app.get('/', (req, res)=> {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds mushrooms', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'}
    ];
    res.render('index', { title: 'Home', blogs });
});
app.get('/about', (req, res)=> {
    res.render('about', { title: 'About'});

});

//redirect
// app.get('/about-us', (req, res)=> {
//     res.redirect('/about');

// });

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog'});
});

//404, needs to be in the bottom
app.use((req, res)=> {
    res.status(404).render('404', { title: '404'});
})