const express = require('express')
const exphbs = require('express-handlebars');
// this is the config with express-js and handlebars to start the application.
function setupExpress(app) {

    const hbs = exphbs.create({
        extname: 'hbs'
    });
    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');

    app.use(express.static('public'))

    app.use(express.urlencoded({
        extended: true
    }))
}


module.exports = setupExpress