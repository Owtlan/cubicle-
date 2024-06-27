const express = require('express');

const dbConnect = require('./config/dbConfig');
const routes = require('./routes');
const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');

const app = express();
expressConfig(app)
handlebarsConfig(app)

const PORT = 5000;



dbConnect()
    .then(() => console.log('DB Connected successfully'))
    .catch(err => console.log('DB error: ', err));

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
