const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

debugger;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err)
        {
            console.log('Unable to append to server.log');
        }
    })
    next();
});

// app.use((req, res, next) => {
//     res.render('maintainence.hbs', {
//         pageTitle: 'Will be right back soon',
//         messageDisplay: 'Site is under maintainence. Please come back soon'
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle : 'Home Page',
        welcomeMessage : 'Welcome to my website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'About Page'        
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage : ' Page cannot be found'
    });
});

app.listen(port, () => {
    console.log(`Server is up in port ${port}`);
});