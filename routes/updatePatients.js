var express = require('express');
var router = express.Router();
var QueryManager = require("../db/queryManager");


router.get('/', async function(req, res, next) {

    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
      };
      res.writeHead(200, headers);
      async function writeRes() { 

          res.write("event: message\n");
          const mq=new QueryManager();
          try{
            const result = await mq.getPatients();
            res.write("data: "+JSON.stringify(result.rows)+"\n\n");
            var timer=setTimeout(writeRes,10000);
          }catch(error){
            //clearTimeout(timer);
            res.write("data: "+JSON.stringify({error:500})+"\n\n");
          }
          
      }
      writeRes();
      
      
      
      
     
  
});

module.exports = router;