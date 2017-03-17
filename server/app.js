// requires n globals
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = 4567;
var index = require('./modules/index.js');
var inventory = require('./modules/inventory.js');

// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended:true }));
app.use('/', index);
app.use('/inventory',inventory);

// spin up server
app.listen(port);
console.log('listening on port',port);

// // base url replaced for what is in line 7 and 17
// app.get("/", function(req, res){
//   console.log('base url hit');
//   res.sendFile(path.resolve('server/public/views/index.html'));
// });
