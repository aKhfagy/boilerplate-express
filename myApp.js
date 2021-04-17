var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    let string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
});

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.send({time: req.time});
});

app.get('/:word/echo', (req, res) => {
    let {word} = req.params;
    res.json({
        echo: word
    });
});

app.get('/name', (req, res) => {
    var { first: firstName, last: lastName } = req.query;
    res.json({
        name: `${firstName} ${lastName}`
    });
});

app.use("/public", express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});


app.get('/json', (req, res) => {
    return (process.env.MESSAGE_STYLE !== "uppercase") ? res.status(200).json({"message": "Hello json"}) : res.json({"message": "HELLO JSON"});
});

app.post('/name', (req, res) => {
    var { first: firstName, last: lastName } = req.body;
    res.json({
        name: `${firstName} ${lastName}`
    });
});













 module.exports = app;
