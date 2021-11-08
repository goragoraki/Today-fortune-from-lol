const express = require('express');
const app = express();
const request = require("request");
const api_key = 'RGAPI-584e1bd0-ab54-455d-9d51-caa0eb33e22a'
const urlenconde = require('urlencode')

app.get('/', (req, res) => {

    res.send("heelow");
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})