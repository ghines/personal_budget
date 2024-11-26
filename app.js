var express = require('express');

var app = express();

// define routes
app.get('/', function(req, res) {
    //res.send('<html><body><h1>Hello World</h1></body></html>');
    res.sendFile(__dirname + '/index.html');
});

app.post('/contact-data', function(req, res) {
    res.send('POST request');
});

app.put('/update-data', function(req, res) {
    res.send('PUT request');
});

app.delete('/delete-data', function(req, res) {
    res.send('DELETE request');
});


var server = app.listen(3000, function() {
    console.log('Node server is running');
});