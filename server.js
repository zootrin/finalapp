const express = require('express');
const hbs = require('hbs');
const request = require('request');
const fs = require('fs');

const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('message', (text) => {
    return text.toUpperCase();
});

app.use((request, response, next) => {
    var time = new Date().toString();
    console.log(`${time}: ${request.method} ${request.url}`);
    var log = `${time}: ${request.method} ${request.url}`;
    fs.appendFile('sever.log', log + '\n', (error) => {
        if(error) {
            console.log('Unable to log message');
        }
    });
    next();
});

app.get('/', (request, response) => {
//     response.send('<h1>Hello Express!</h1>');
    reponse.send({
        name: "Alasdair",
        school: [
            'BCIT',
            'SFU',
            'UBC'
        ]
    })
});

app.get('/info', (request, response) => {
    response.send('about.hbs', {
        title: 'About Page',
        year: new Date().getFullYear(),
        welcome: 'Hello!'
    });
});

app.get('/404', (request, response) => {
    response.send({
        error: 'Page not found'
    })
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});

