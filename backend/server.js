require('dotenv').config();
const express = require('express');
const knex = require('knex');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const knexConfig = require('./knexfile');
const environment = process.env.NODE_ENV || 'development';
const db = knex(knexConfig[environment]);

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200,
}

const app = express();

const port = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors(corsOptions));

// database migrations
// Automatically run migrations on server start
db.migrate.latest()
    .then(() => console.log('Database migrated successfully'))
    .catch(error => console.error('Error migrating database:', error));

// routes
app.get('/', (req, res) => {
    res.send("Hello World");
});
app.use('/api/admin', require('./routes/adminRoute'));
app.use('/api/vendor', require('./routes/vendorRoute'));
app.use('/api/category', require('./routes/categoryRoute'));
app.use('/api/product', require('./routes/productRoute'));
app.use('/api/default', require('./routes/defaultRoute'));
app.use('/api/auth', require('./routes/authRoute'));


app.listen(port, () => console.log(`App listening on port ${ port }`));