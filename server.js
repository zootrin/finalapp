const express = require('express');
const hbs = require('hbs');
const request = require('request');
const fs = require('fs');

const port = process.env.PORT || 8080;

var app = express();

request({
    url: 'https://deckofcardsapi.com/api/deck/new/draw/?count=5',
    json: true
}, (error, response, body) => {
    console.log(JSON.stringify(body.cards[0].image, undefined, 2));
});

var getCards = (numCards, callback) => {
    console.log('Loading API https://deckofcardsapi.com/api/deck/new/draw/?count=' + encodeURIComponent(numCards));
    request({
        url: 'https://deckofcardsapi.com/api/deck/new/draw/?count=' + encodeURIComponent(numCards),
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Cannot connect to deck of cards API');
        }
        else if (body.success === 'false') {
            callback('Cannot find requested cards');
        }
        else {
            callback(undefined, {
                numCards: numCards,
                card1: body.cards[0].image,
                card2: body.cards[1].image,
                card3: body.cards[2].image,
                card4: body.cards[3].image,
                card5: body.cards[4].image,
            })
        }
    });
};

var cards='';
var card1='';
var card2='';
var card3='';
var card4='';
var card5='';

getCards(5, (errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage);
         cards = (errorMessage)
    } else {
        getCards(results.numCards, (errorMessage, results) => {
            if(errorMessage) {
                console.log(errorMessage);
                cards = (errorMessage)
            } else {
                console.log(results);
                cards = (results.numCards);
                card1 = (results.card1);
                card2 = (results.card2);
                card3 = (results.card3);
                card4 = (results.card4);
                card5 = (results.card5)
            }
        });
    }
});

app.get('/cards', (request, response) => {
    response.render('cards.hbs', {
        cards: cards,
        card1: card1,
        card2: card2,
        card3: card3,
        card4: card4,
        card5: card5
    });
});


// console.log('http://api.nasa.gov/api/search?q={q}');



// //GET /search?q={q}	Performing a search
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


//
// hbs.registerHelper('getCurrentYear', () => {
//     return new Date().getFullYear();
// });
//
// hbs.registerHelper('message', (text) => {
//     return text.toUpperCase();
// });
//
// // app.use((request, response, next) => {
// //     var time = new Date().toString();
// //     console.log(`${time}: ${request.method} ${request.url}`);
// //     var log = `${time}: ${request.method} ${request.url}`;
// //     fs.appendFile('sever.log', log + '\n', (error) => {
// //         if(error) {
// //             console.log('Unable to log message');
// //         }
// //     });
// //     next();
// // });
// //
// // app.get('/', (request, response) => {
// //     response.render('main.hbs');
// // });
// //
// // app.get('/info', (request, response) => {
// //     response.render('about.hbs', {
// //         // title: 'About Page',
// //         // year: new Date().getFullYear(),
// //         // welcome: 'Hello!'
// //     });
// // });
// //
// // app.get('/404', (request, response) => {
// //     response.send({
// //         error: 'Page not found'
// //     })
// // });
//

app.get('/cards', (request, response) => {
    response.render('cards.hbs', {
        cards: cards
    });

});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});

