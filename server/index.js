const express = require('express');
const dotenv = require('dotenv').config();
const cors = require("cors");
const morgan = require("morgan");
const connectdb = require("./database/connection.js");
// Configure CORS options
//const corsOptions = {
//  origin: 'https://theeliteinternational.com', // Allow this origin
//  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
//  allowedHeaders: ['Authorization', 'Content-Type'], // Allow these headers
//};

const app = express();

// middleware

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
//app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.disable('x-powered-by'); //less hackers know about our stack

const port = process.env.PORT || 5000;

app.use("/api", require("./routes/userRoutes.js"))
app.use("/api", require("./routes/payRoutes.js"))

connectdb();
// console.log('hi');

// const server = app.listen(3000, () => {
//     console.log(`Server started on http://localhost:${port}`);
// });

// server.on('error', (error) => {
//     console.error('Server error:', error);
// });

app.listen(port, () => {
    console.log(`Started on http://localhost:${port}`)
})
