var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json()); 

router.get('/', function(req, res, next) {
    var sql = "SELECT * FROM todotable";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json(rows)
    })
  });


  router.post('/', function(req, res, next) {
    var title = req.body.title;
    var description = req.body.description;
    var category = req.body.category;
    var due_date = req.body.due_date;
  
    var sql = `INSERT INTO todotable (title, description, category, due_date) VALUES ("${title}", "${description}", "${category}", "${due_date}")`;
    db.query(sql, function(err, result) {
      if(err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json({'status': 'success', 'status_code': '200'})
    })
  });

  module.exports = router;

  //-------------------

//   CREATE TABLE `todoTable` (
//     `id` int(10) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     `title` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
//     `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
//     `category` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
//     `due_date` datetime NOT NULL
//   ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  
//   INSERT INTO `products` ('id', `title`, `description`, `category`, `due_date`) VALUES
//   (1, 'title 1', 'description 1', 'category 1', '2019-03-26 18:10:21'),
//   (2, 'title 2', 'description 2', 'category 2',  '2019-03-26 18:10:37'),
//   (3, 'title 3', 'description 3', 'category 3',  '2019-03-26 18:11:01');