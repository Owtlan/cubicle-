const express = require('express')
const config = require('./config/config')
const exphbs = require('express-handlebars');
const app = express()


const hbs = exphbs.create({
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home', { layout: false })
});

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`))