const request = require('request');

request({
    url: encodeURI('https://deckofcardsapi.com/api/deck/new/draw/?count=5'),
    json: true
}, (error, response, body) => {
    console.log(body);
});