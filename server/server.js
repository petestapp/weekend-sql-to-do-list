// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pool = require('./modules/pool');
// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
// globals
const port = 3000;
// spin up server
app.listen(port, ()=>{
    console.log('server is up on:', port);
})
// routes
app.get('/tasks', (req, res)=>{
    const queryString = `SELECT * FROM tasks`;
    pool.query(queryString).then((results)=>{
        res.send(results.rows);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})