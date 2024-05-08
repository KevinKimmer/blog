const path = require("path")
const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')
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
app.use(express.urlencoded({ extended: true}));

// express sends status code to browser, and sets header
app.get('/', (req, res)=> {
    res.redirect('/blogs')
});
app.get('/about', (req, res)=> {
    res.render('about', { title: 'About'});

});

//redirect
// app.get('/about-us', (req, res)=> {
//     res.redirect('/about');

// });

//blog routes
app.use('/blogs', blogRoutes);


//404, needs to be in the bottom
app.use((req, res)=> {
    res.status(404).render('404', { title: '404'});
})