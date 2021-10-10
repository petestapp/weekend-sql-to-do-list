// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pool = require('./modules/pool');
const e = require('express');
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
    let queryString = `SELECT * FROM tasks`;
    pool.query(queryString).then((results)=>{
        res.send(results.rows);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})

app.put('/tasks', (req, res)=>{
    console.log('/tasks PUT:', req.query);
    let queryString = `UPDATE tasks SET complete=true WHERE id='${req.query.id}'`;
    pool.query(queryString).then((results)=>{
        res.sendStatus(201);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})

app.delete('/tasks', (req, res)=>{
    console.log('/tasks DELETE:', req.query);
    let queryString = `DELETE FROM tasks WHERE id='${req.query.id}'`;
    pool.query(queryString).then((results)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})