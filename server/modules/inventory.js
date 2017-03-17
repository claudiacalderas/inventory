// requires and globals
var express = require('express');
var router = express.Router();
// the array of our inventory
var allTheThings = [];

//temp data for testing:
allTheThings.push({name: 'sofa', description: 'gray canvas sofa'});
allTheThings.push({name: 'sofa bed', description: 'convertible sleeper'});
allTheThings.push({name: 'table', description: 'round wooden table'});

// routes
router.get('/', function(req,res) {
  console.log('inventory base get');
  res.send(allTheThings);
});

router.post('/add',function(req,res){
  // called fro addItemButton on click
  console.log('inventory add route', req.body);
  // add this item to allTheThings
  allTheThings.push(req.body);
  console.log(allTheThings);
  // send back success
  res.sendStatus(200);
});

router.post('/searchByName',function(req,res){
  // called from searchByNameButton on click
  console.log('inventory searchByName route',req.body);
  // array with items that match the search
  var matches = [];
  for (var i = 0; i < allTheThings.length; i++) {
    if (allTheThings[i].name.includes(req.body.name)) {
      matches.push(allTheThings[i]);
    }
  }
  res.send(matches);
});

router.post('/searchByDescription',function(req,res){
  // called from searchByNameButton on click
  console.log('inventory searchByDescription route',req.body);
  // array with items that match the search
  var matches = [];
  for (var i = 0; i < allTheThings.length; i++) {
    if (allTheThings[i].description.includes(req.body.description)) {
      matches.push(allTheThings[i]);
    }
  }
  res.send(matches);
});

router.post('/removeItem',function(req,res){
  // called from removeItem button on click
  console.log('inventory removeItem route',req.body);
  // removes specific item from array
  var index = parseInt(req.body.index);
  if (index > -1) {
    allTheThings.splice(index, 1);
  }
  res.sendStatus(200);
});

router.post('/search',function(req,res) {
  console.log('inventory search route');
  var matches = [];
  for (var i = 0; i < allTheThings.length; i++) {
    if (allTheThings[i].name.includes(req.body.name) && allTheThings[i].description.includes(req.body.description)) {
      matches.push(allTheThings[i]);
    }
  }
  res.send(matches);
});

// exports
module.exports = router;
