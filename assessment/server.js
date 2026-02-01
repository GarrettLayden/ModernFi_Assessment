const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/Home.html");
})

// Routing HTML
app.use(express.static(__dirname + '/'));

app.get('/orders', (req, res) => {
    res.sendFile(__dirname + '/Orders.html');
});

// Starting APIs
const orders = require('./routes/orders');
app.use('/orders', orders);


app.get('*', (req, res) => {
    res.sendFile(__dirname + '/404.html');
});

app.listen(PORT, async () => {
    console.log("Initializing ModernFi Assessment...");
})