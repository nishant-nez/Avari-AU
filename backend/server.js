require('dotenv').config();
const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');
const environment = process.env.NODE_ENV || 'development';
const db = knex(knexConfig[environment]);

const app = express();

const port = process.env.PORT;

// middlewares
app.use(express.json());

// database migrations
// Automatically run migrations on server start
db.migrate.latest()
    .then(() => console.log('Database migrated successfully'))
    .catch(error => console.error('Error migrating database:', error));

// routes
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/api/test', require("./routes/testRoute"));

app.listen(port, () => console.log(`App listening on port ${ port }`));