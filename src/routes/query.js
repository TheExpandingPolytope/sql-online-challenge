const express = require('express');
const router = express.Router();

const User = require('../models/Users');
const isAuth = require('../middleware/isAuth');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('chinook.db');

//get all saved queries
router.post('/all', isAuth, (req, res) => {
    User.findById(req.user._id, (err, doc)=>{
        console.log(doc);
        res.send(JSON.parse(doc.queries).data);
    })
    
});

//make a query to database
//and return response
router.post('/run', isAuth, (req, res) => {
    console.log(req.body);
    db.run(req.body.code,function(err, doc){
        console.log(err);
        console.log(doc);
        if(err) return res.send(err);
        console.log(this);
        return res.send("cool");
    })
});

//save query
router.post('/save', isAuth, (req, res) => {
    User.findById(req.user._id, (err, doc)=>{
        console.log(doc);
        var added = false;
        console.log(doc.queries);
        var queries = JSON.parse(doc.queries);
        console.log(queries);
        for (let index = 0; index < queries.data.length; index++){
            if(queries.data[index].name == req.body.name){
                added = true;
                queries.data[index] = req.body;
            }
        }
        if(!added) queries.data.push(req.body);
        doc.queries = JSON.stringify(queries);
        doc.save().then(()=>{
            res.send(queries.data);
        });
    })
});

module.exports = router;