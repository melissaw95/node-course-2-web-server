const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3001;

//creating the app
var app = express();

//register partials
hbs.registerPartials(__dirname + '/views/partials');

//set various express related configs
app.set('view engine', 'hbs');

//append Date and Method to server log
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

//maintenance middleware
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

//points to public folder, dirname stores path to project directory
app.use(express.static(__dirname + '/public'));

//registering helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//setting up handlers
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to My Website'
  });
});

app.get ('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

//bind application to a local port
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
