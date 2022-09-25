var express = require('express');
var bcrypt=require('bcrypt');
var router = express.Router();



router.get('/', function(req, res, next) {
  res.render('login', { title: 'Accedi' });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  if(req.body.password==process.env.ADMINPASSWORD) res.redirect('/home');
  else res.render('login', {title:'Accedi',error:'fail'})
}); 

module.exports = router;


  