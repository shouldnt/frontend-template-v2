const path = require('path');
var express = require('express');
var router = express.Router();
var routerList = require('./routerList');

/* GET home page. */
for(let i = 0; i < routerList.length; i++){
   	router.get(path.join('/', routerList[i]), function(req, res, next) {
	  res.render('index');
	});

}


module.exports = router;
