var express = require('express');
var router = express.Router();


//function(req, res, next) callback function
//req is request sent, res is response built by express js, next is called for route (request) to continue
router.get('/', function (req, res, next) {
  res.render('index');
});


module.exports = router;
