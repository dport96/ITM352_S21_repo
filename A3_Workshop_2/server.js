var express = require('express');
var app = express();
var myParser = require("body-parser");
var session = require('express-session');
var products_data = require('./products.json');

app.use(myParser.urlencoded({ extended: true }));
app.use(session({secret: "MySecretKey", resave: true, saveUninitialized: true}));

app.all('*', function (request, response, next) {
    console.log(`Got a ${request.method} to path ${request.path}`);
    // need to initialize an object to store the cart in the session. We do it when there is any request so that we don't have to check it exists
    // anytime it's used
    if(typeof request.session.cart == 'undefined') { request.session.cart = {}; } 
    next();
});

app.post("/get_products_data", function (request, response) {
    response.json(products_data);
});
/*
app.get("/add_to_cart", function (request, response) {
    var products_key = request.query['products_key']; // get the product key sent from the form post
    var quantities = request.query['quantities'].map(Number); // Get quantities from the form post and convert strings from form post to numbers
    request.session.cart[products_key] = quantities; // store the quantities array in the session cart object with the same products_key. 
    response.redirect('./cart.html');
});
*/

app.post("/update_cart", function (request, response) {
    console.log(request.body);
    // replace cart in session with post 
    request.session.cart = request.body.quantities;
    response.redirect(request.get('Referrer'));
});

app.post("/get_cart", function (request, response) {
    response.json(request.session.cart);
});

app.post("/remove_item", function (request, response) {
    console.log(request.query);
    // update cart with pkey and index 
    request.session.cart[request.query.pkey][request.query.index] = 0;
    console.log(request.session.cart);
    response.json({"msg":"removed"});
});

/*
app.get("/view_cart", function (request, response) {
    order_str = 'Your order is:<br>';
    for(prod_key in request.session.cart) { 
    var products = products_data[prod_key];
    var quantities = request.session.cart[prod_key];

    // grab the quantities from the query string
    for (i in quantities) {
        order_str += `You want ${quantities[i]} of ${products[i]['name']}<br>`;
    }

} 
    response.send(order_str);
});
*/
app.get("/add_to_cart", function (request, response) {
    var params=request.query;
    console.log(params);
    var prod_key = params['products_key'];
    var quantities = params['quantities'];
    // add to session to save in cart
    request.session.cart[prod_key] = quantities;
    console.log(request.session.cart);
    response.redirect(request.get('Referrer'));
});


app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));