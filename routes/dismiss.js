var express = require('express');
var router = express.Router();
var QueryManager = require("../db/queryManager");

router.post('/', async function(req, res, next) {
    const mq=new QueryManager();
    var n=await mq.deletePatient(req.body.cod);
    if(n!=1) res.sendStatus(500)
    else res.redirect('/home');
    

});

module.exports = router;