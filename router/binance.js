var router = require("express").Router()
var pg = require('pg');
var pool = new pg.Pool({
    database: 'db',
    user: 'admin', 
    password: 'admin', 
    host: 'app-db',
    port: 5432,
});
var id = 4

router.use((req, res, next) => {
    console.log((new Date()).toISOString());
    next();
});

router.get('/db', function(req, res, next) {
    pool.connect( function(err, client) {
      if (err) {
        console.log(err);
      } else {
        client.query('SELECT name FROM staff', function (err, result) {
          res.render('pages/db', {
            title: 'Express',
            name: result.rows[0].name,
          });
          console.log(result);
        });
      }
    });
});

router.get('/db_insert', function(req, res, next) {
    pool.connect( function(err, client) {
        if (err) {
          console.log(err);
        } else {
          client.query("INSERT INTO staff VALUES (" + req.query.id + ", '"+ req.query.name + "', "+ req.query.age + ")", function (err, result) {
            id++;
            res.render('pages/db_result', {
              title: 'Express',
              result: 'insert',
            });
            console.log(result);
          });
        }
    }); 
})

router.get("/", (req,res) => {
    res.render('pages/db');
});
router.get("/test", (req,res) => {
    res.send("/test/")
});
module.exports = router;