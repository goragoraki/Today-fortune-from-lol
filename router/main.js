const express = require('express');
const app = express();
const request = require("request");
const api_key = 'RGAPI-584e1bd0-ab54-455d-9d51-caa0eb33e22a'
const urlenconde = require('urlencode')
const homeView = require('../views/home.js')
const qs = require('querystring')
app.get('/', (req, res) => {
    var nickName = "";
    var html = homeView.html(
        `
        <form action = "/process_search" method = "post">
        <p><input type = "text" name = name placeholder = "title"></p>
        <p><textarea name = description placeholder = "description"></textarea></p>
        <p><input type = "submit"></p>
        </form>
        `,'<a href = "/update">update</a>'
    );
    res.send(html);
})

app.post('/process_search', (req, res) => {
    var body = '';
    req.on('data', (data) => {
        body += data;
    });

    req.on('end', () => {
        var post = qs.parse(body);
        var nickName = post.name;
    })
})





























app.listen(3000, () => {
    console.log('listening on port 3000');
})