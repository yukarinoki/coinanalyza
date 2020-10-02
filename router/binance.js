var router = require("express").Router()
var pg = require('pg');

router.use((req, res, next) => {
    console.log((new Date()).toISOString());
    next();
});

router.get('/db', function(req, res, next) {
    var pool = new pg.Pool({
      database: 'db',
      user: 'admin', 
      password: 'admin', 
      host: 'app-db',
      port: 5432,
    });
    pool.connect( function(err, client) {
      if (err) {
        console.log(err);
      } else {
        client.query('SELECT name FROM staff', function (err, result) {
          res.render('pages/db', {
            title: 'Express',
            datas: result.rows[0].name,
          });
          console.log(result);
        });
      }
    });
});

router.get("/", (req,res) => {
    res.send("/use323/")
});
router.get("/test", (req,res) => {
    res.send("/test/")
});
module.exports = router;