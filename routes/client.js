var express = require("express");
var router = express.Router();
var QueryManager = require("../db/queryManager");

router.get("/", async function (req, res, next) {
    var id = req.query.id;
    const mq=new QueryManager();
    var result= await mq.qetQueue(id,next);
    res.render('queue',[pazientiDavanti=result.rows[0].pazientidavanti]);
});

module.exports = router;
