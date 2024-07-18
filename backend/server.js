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
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors(corsOptions));

// database migrations
// Automatically run migrations on server start
db.migrate.latest()
    .then(() => console.log('Database migrated successfully'))
    .catch(error => console.error('Error migrating database:', error));


app.use('/api/stripe', require('./routes/stripeRoute'));


app.use(express.json());


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
app.use('/api/order', require('./routes/orderRoute'));

// email
const sendMail = require('./config/sendMail');

const data =
{
    "id": 1,
    "stripe_id": "cs_test_b1pIZDHIZiJzGIjJIYmNU9U7Mn6B9fTed8pFrZcgKFNJLX8vLaikraYmMA",
    "amount_subtotal": 93202,
    "amount_total": 93222,
    "city": "radsfasd",
    "country": "AU",
    "address_line_1": "loaosdfi",
    "address_line_2": "hadsfg",
    "postal_code": "5454",
    "state": "SA",
    "name": "Elliot Priest",
    "email": "elliot@gmail.com",
    "phone": "+61440000000",
    "currency": "usd",
    "shipping_cost": 20,
    "status": "To be delivered",
    "created_at": "2024-07-16T16:27:27.919Z",
    "products": [
        {
            "id": 2,
            "name": "banana",
            "description": "long yellow bananas",
            "price": 11.32,
            "unit": "kg",
            "image": "images/products/1721147110684-viber_image_2023-06-02_07-37-59-335.jpg",
            "quantity": 1,
            "vendor": {
                "id": 3,
                "name": "vendor3",
                "email": "vendor3@gmail.com",
                "location": "canberra",
                "state": "state2",
                "country": "Australia",
                "latitude": null,
                "longitude": null,
                "phone": "7689012456"
            }
        },
        {
            "id": 1,
            "name": "apple",
            "description": "red apple",
            "price": 120,
            "unit": "kg",
            "image": "images/products/1721147091938-viber_image_2023-06-02_07-37-59-335.jpg",
            "quantity": 6,
            "vendor": {
                "id": 2,
                "name": "vendor2",
                "email": "vendor2@gmail.com",
                "location": "canberra",
                "state": "state2",
                "country": "Australia",
                "latitude": null,
                "longitude": null,
                "phone": "7689012456"
            }
        },
        {
            "id": 3,
            "name": "brinjal",
            "description": "brinjal wow",
            "price": 66.9,
            "unit": "pcs",
            "image": "images/products/1721147139756-viber_image_2023-06-02_07-37-59-335.jpg",
            "quantity": 3,
            "vendor": {
                "id": 1,
                "name": "vendor1",
                "email": "vendor1@gmail.com",
                "location": "canberra",
                "state": "state2",
                "country": "Australia",
                "latitude": null,
                "longitude": null,
                "phone": "7689012456"
            }
        },
        {
            "id": 4,
            "name": "potato",
            "description": "potato wow",
            "price": 123.9,
            "unit": "pcs",
            "image": "images/products/1721147139756-viber_image_2023-06-02_07-37-59-335.jpg",
            "quantity": 5,
            "vendor": {
                "id": 1,
                "name": "vendor1",
                "email": "vendor1@gmail.com",
                "location": "canberra",
                "state": "state2",
                "country": "Australia",
                "latitude": null,
                "longitude": null,
                "phone": "7689012456"
            }
        }
    ]
}



app.get('/api/email', (req, res) => {
    sendMail(data);
    res.send('Email sent');
});


app.listen(port, () => console.log(`App listening on port ${ port }`));