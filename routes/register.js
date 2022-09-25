var express = require('express');
var router = express.Router();
var QRCode = require('qrcode');
var QueryManager = require("../db/queryManager");

router.get('/', function(req, res, next) {
  if(req.query.error=='alreadypresent'){
    
      res.render('register', { title: 'Registra Paziente', message:'Un paziente con lo stesso codice fiscale è già registrato: operazione annullata'});
      return;
  }
  if(req.query.error=='servererror'){
    res.render('register', { title: 'Registra Paziente', message:'Errore nel server, riprova più tardi'});
      return;
  }
  var link=req.query.id;
  if(!link) {
    res.render('register', { title: 'Home'});
    return;
  };
  var paziente=req.query.paziente;
  const generateQR = async text => {
    try { return await QRCode.toDataURL(text) } 
    catch (err) { return console.error(err) }
  }
  generateQR(process.env.serverlocalip+':3000/queue?id='+link).then((data) => { 
    res.render('register', { title: 'Registra Paziente', qrcode:data,message:paziente.replace("-"," ")+'\nregistrato'});
  
  });
});

router.post('/', async function(req, res, next) {

      const mq=new QueryManager();
      try{
        var result = await mq.registerPatient(req.body);
        res.redirect('/register?id='+result.rows[0].id+'&paziente='+req.body.nome+"-"+req.body.cognome);
      }
      catch(error){
        if(error.code==23505){
          res.redirect('/register?error=alreadypresent');
        }
        else{
          res.redirect('/register?error=servererror');
        }

       

      }

      

});

module.exports = router;