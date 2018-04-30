let express = require('express');
let router = express.Router();
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let User = require('../models/user');

//called url is '/user'
router.post('/', function(req, res, next){
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email
  });
  user.save(function(err, result){
    if(err){
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    res.status(201).json({
      message: 'User created',
      obj: result
    });
  });
})

//called url is '/user/signin'
router.post('/signin', function(req, res, next){
  User.findOne({email: req.body.email}, function(err,user){
    if(err){
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    if(!user){
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'} //generic return message to mask whether email or password is invalid
      });
    }
    if(!bcrypt.compareSync(req.body.password, user.password)){
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    let token = jwt.sign({user: user},'secret',{expiresIn: '2h'});
    res.status(200).json({
      message: 'Successfully logged in',
      token: token,
      userId : user._id
    });
  })
})


module.exports = router;
