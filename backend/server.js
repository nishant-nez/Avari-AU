require('dotenv').config();
const express = require("express");
const app = express();

const port = process.env.PORT;

// middlewares
app.use(express.json());


// routes
app.get('/', (req, res) => {
    res.send("Hello World");
});


app.listen(port, () => console.log(`App listening on port ${ port }`));