const express = require('express')
const path = require('path')
const pg = require('pg');
const PORT = process.env.PORT || 5000

var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app
  .use(express.static(path.join(__dirname, 'public')))
  .use("/c3", express.static(__dirname + "/node_modules/c3"))
  .use("/d3", express.static(__dirname + "/node_modules/d3"))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))

app.use("/binance", require("./router/binance.js"))
  
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
