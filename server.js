const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;

// app.get('/', (request, response) => {
//     response.send('<h1>Hello Express!</h1>');
// });

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});

