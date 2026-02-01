const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/404.html');
});

app.listen(PORT, async () => {
    console.log("Initializing ModernFi Assessment...");
})