const express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql'); 

const app = express();
const port = 80;

var urlencodedParser = bodyParser.urlencoded({extended:false});

function writeToDB(firstname,lastname){
 var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mohit@mariadb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query('show Databases;', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

con.end();

}

//writeToDB('a','a');

// this will read form.html file and store it in contents variable
var contents = fs.readFileSync('form.html').toString();
//console.log(contents);

// this will serve the get request
app.get('/', (request, response) => {
  //console.log(request);
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(contents);
  //console.log(response);
});

app.post('/',urlencodedParser,(request, response) => {
  //console.log(request);
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end('Form Submited');
  //console.log(request.body);
  var firstname = request.body.firstname;
  var lastname = request.body.lastname;
  console.log(firstname,lastname);
   writeToDB(firstname,lastname);
  //console.log(response);
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
