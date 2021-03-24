var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require("body-parser");
app.use(myParser.urlencoded({ extended: true }));

var filename = './A1_registration_data.json';
if (fs.existsSync(filename)) {
    registrations = require(filename);
} else {
    registrations = {};
}

app.get("/register", function (request, response) {
    // Give a simple register form
    let table_form = concept_table();
    
    table_form += 
    `<br>
    <form action="/register_assignment1_concept" method="POST">
    <h3>My Assignment 1 Application concept is:</h3>
    <textarea name="concept_textarea" rows="4" cols="50" spellcheck="true"></textarea>
    <br><br>
    <label for="name_textbox">Name:</label>
    <input name="name_textbox" type="textbox">&nbsp;
    <input type="submit" value="Register This">
    </form>
    `;
    response.send(table_form);
});

app.post("/register_assignment1_concept", function (request, response) {
    var updated = false;
    if(typeof registrations[request.body["name_textbox"]] != 'undefined') {
        updated = true;
    }
    registrations[request.body["name_textbox"]] = request.body["concept_textarea"];
    fs.writeFileSync(filename, JSON.stringify(registrations));

    let out = concept_table();
    out += '<h1>' + 
       (updated?`<font color="red">${request.body["name_textbox"]} has been updated`:`<font color="green">${request.body["name_textbox"]} has been added`)
       +'</font></h1>';
    response.send(out);
});

app.listen(8080, () => console.log(`listening on port 8080`));

function concept_table() {
    str = `
    <table border="1px">
        <tr><th>Name</th><th>Concept</th></tr>
`;

    for (key in registrations) {
        str += `<tr ><td>${key}</td><td>${registrations[key]}</td></tr>`;
    }

    str += `</table>`;

    return str;
}