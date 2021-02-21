require('dotenv').config()
const mysql = require('mysql');
const express = require('express')
const app = express()


const port = process.env.PORT || 8390


const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  }
  )




app.get('/books', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
    con.query("SELECT * FROM books ORDER BY RAND()", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify(result))
    });
})