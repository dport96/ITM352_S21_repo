var express = require('express');
var app = express();
var myParser = require("body-parser");
app.use(myParser.urlencoded({ extended: true }));
var qs = require('qs');


app.all('*', function (req, res, next) {
    console.log(req.method, req.path);
    next();
} );

// This processes the login form 
app.post('/process_login', function (request, response, next) {
    console.log(request.query);
    // Check login and password match database

    // all good, send to invoice
    request.query["purchased"] = "true";
    request.query["uname"] = request.body["uname"];
    response.redirect('products_store.html?' + qs.stringify(request.query));
});

// This processes the login form 
app.post('/process_register', function (request, response, next) {
    response.send(request.body);
});

app.use(express.static('./static'));

var listener = app.listen(8080, () => { console.log('server started listening on port ' + listener.address().port) });