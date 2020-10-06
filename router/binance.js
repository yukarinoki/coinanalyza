var router = require("express").Router()
const { body, query, validationResult } = require('express-validator');
var pg = require('pg');
require('dotenv').config();

console.log(process.env.ENV_DB)

var pool = new pg.Pool({
    host: process.env.ENV_HOST,
    database: process.env.ENV_DATABASE,
    user: process.env.ENV_USER,
    port: 5432,
    password: process.env.ENV_PASSWORD,
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
          })
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
    pool.connect( function(err, client) {
        if (err) {
          res.status(400).send(err);
        } else {
          client.query('SELECT id FROM client', function (err, result) {
            res.render('pages/binance_ids.ejs', {
                ids: result.rows
            })
            client.release(true)
            console.log(result);
          });
        }
    });
});
router.get("/price", [query("id").isLength({min: 8, max: 8})],(req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const query = {
        text: 'SELECT * FROM price WHERE id=$1',
        values: [req.query.id],
    }
    pool.connect( (err, client) =>{
        if(err){
            client.release(true)
            return res.status(400).json({error: err.message})
        }
        else {
            client.query(query)
            .then(result => {console.log(result); return res.render('pages/price.ejs', {rowCount: result.rowCount, data: result.rows})})
            .catch(error => {console.error(error); return res.status(400).send(error.message)})
            .finally(() => client.release(true))
        }
    })
})

router.post("/id", [ body('id').isLength({ min: 8 }) ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const query = {
        text: 'INSERT INTO client VALUES($1)',
        values: [req.body.id],
    }
    pool.connect( (err, client) =>{
        if(err){
            client.release(true)
            return res.status(400).json({error: err.message})
        }
        else {
            client.query(query)
            .then(result => {return res.send('success')})
            .catch(error => {console.error(error); return res.status(400).send(error.message)})
            .finally(() => client.release(true))
        }
    })
})

router.post(
"/price",
[ 
    body('id').isLength({ min: 8, max: 8}),
    body('first_ratio').isDecimal(),
    body('first_1').isLength({max: 8}),
    body('first_2').isLength({max: 8}),
    body('first_3').isLength({max: 8}),
    body('second_ratio').isDecimal(),
    body('second_1').isLength({max: 8}),
    body('second_2').isLength({max: 8}),
    body('second_3').isLength({max: 8}),
    body('third_ratio').isDecimal(),
    body('third_1').isLength({max: 8}),
    body('third_2').isLength({max: 8}),
    body('third_3').isLength({max: 8}),
], 
(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const query = {
        text: 'INSERT INTO price(id, first_ratio, first_1, first_2, first_3, second_ratio, second_1, second_2, second_3, third_ratio, third_1, third_2, third_3) VALUES($1, $2, $3 ,$4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
        values: [req.body.id, req.body.first_ratio, req.body.first_1, req.body.first_2, req.body.first_3, req.body.second_ratio, req.body.second_1, req.body.second_2, req.body.second_3, req.body.third_ratio, req.body.third_1, req.body.third_2, req.body.third_3],
    }
    pool.connect( (err, client) =>{
        if(err){
            client.release(true)
            return res.status(400).json({error: err.message})
        }
        else {
            client.query(query)
            .then(result => {return res.send('success')})
            .catch(error => {console.error(error); return res.status(400).send(error)})
            .finally(() => client.release(true))
        }
    })
})


router.get("/test", (req,res) => {
    res.send("/test/")
});
module.exports = router;