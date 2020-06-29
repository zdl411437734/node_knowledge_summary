var express = require('express');
var Users = require('../modules/User').User;
var format = require('date-format');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/save', function(req, res, next) {
  console.log(req);
  var username = req.query.u1;
  if(username==undefined||username==''||username.length<1){
    username = 'zhangdl';
  }
  var user ={username:username,password:'123456',salt:'awawawaw',create_date:format('yyyy-MM-dd hh:mm:ss',new Date()),update_date:format('yyyy-MM-dd hh:mm:ss',new Date()),ext:'',remark:''};
  Users.register(user,function(p1,p2){
    console.error(p1);
    console.error(p2);
  })
  res.send('respond with a resource');
});

module.exports = router;
