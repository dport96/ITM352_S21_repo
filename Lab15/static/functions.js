// This function asks the server for a "service" and converts the response to text. 
function loadJSON(service, callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('POST', service, false);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 async function request(service, callback, post_data={}) {
     var data;
     await fetch(service, {
        method: 'post',
        body: JSON.stringify(post_data)
      }).then( function(response) {
            if(response.ok) {
                response.json().then(function(json_data){
                    callback(json_data);
                });
            }
          });
          //return data;
}

// This function makes a navigation bar from a products_data object

function nav_bar(this_product_key, products_data) {
    // This makes a navigation bar to other product pages
    for (let products_key in products_data) {
        if (products_key == this_product_key) continue;
        document.write(`<a href='./display_products.html?products_key=${products_key}'>${products_key}<a>&nbsp&nbsp&nbsp;`);
    }
}
