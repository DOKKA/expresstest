var express = require('express');
var router = express.Router();

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
  server: 'localhost',
  userName: 'FuelFX',
  domain: 'TERRENCE-PC',
  password: 'password',
  options: {
    database: 'RAD'
  }
};

var connection = new Connection(config);

router.get('/')

/* GET home page. */
router.get('/data', function(req, res, next) {

  var rows = [];
  var request = new Request("select * from UserAccounts", function(err, rowCount){
    res.send(rows);
  });

  request.on('row', function(columns) {
    var row  = columns.map(function(column){
      return column.value
    });
    rows.push(row);
  });

  connection.execSql(request);
});

module.exports = router;
