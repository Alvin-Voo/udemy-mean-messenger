var express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken');

let User = require('../models/user');
let Message = require('../models/message');

//url starts with '/message'
router.get('/', function(req, res, next){
  Message.find()
    .populate('user','firstName')//populate the user field of the message documents found with firstName based on ref model User
    .exec(function(err, messages){//use exec if dont want to provide callback function to find method
      if(err){
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(200).json({
        message:'Success',
        obj: messages
      });
    })
})

//token validation before all the request before; except for the get request above
router.use('/', function(req, res, next){
  jwt.verify(req.query.token, 'secret' ,function(err, decoded){
    if(err){
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      })
    }
    next();
  })
})


//function(req, res, next) callback function
//req is request sent, res is response built by express js, next is called for route (request) to continue
//url starts with '/message'
router.post('/', function (req, res, next) { //saving/creating message in db
  let decoded = jwt.decode(req.query.token);//this return the token payload
  console.log(decoded.user._id);
  User.findById(decoded.user._id, function(err, user){
    if(err){
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    let message = new Message({
      content: req.body.content,//filling up the content (mongo model), with content from message model (front end)
      user: user //<--- tie the whole user object (including user id) to message
    });
    console.log("message? ");
    console.log(message);
    message.save(function(err, result){
      if(err){
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      user.messages.push(result._id) //<--- tie the message id back to user messages
      user.save();
      res.status(201).json({
        message: 'Saved Message',
        obj: result//<-- the result returned here will include user with its whole object
        //but only the ObjectId of User is saved in mongo
        //the result returned maybe a direct copy of the message document input
      })
    })
  })
});

router.patch('/:id', function(req, res, next){
  let decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, function(err, message){
    if(err){
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    if(!message){
      return res.status(500).json({
        title: 'No Message Found!',
        error: {message: 'Message Not Found!'}
      });
    }
    if(message.user != decoded.user._id){
      return res.status(401).json({
        title: 'Not Authenticated',
        error: {message: 'User does not match!'}
      })
    }
    message.content = req.body.content;
    message.save(function(err, result){
      if(err){
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      };
      res.status(200).json({
        message: 'Updated message',
        obj: result
      });
    })
  })
})

router.delete('/:id', function(req, res, next){
  let decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, function(err, message){
    if(err){
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    if(!message){
      return res.status(500).json({
        title: 'No Message Found!',
        error: {message: 'Message Not Found!'}
      });
    }
    if(message.user != decoded.user._id){
      return res.status(401).json({
        title: 'Not Authenticated',
        error: {message: 'User does not match!'}
      })
    }
    message.remove(function(err, result){
      console.log("message remove 1");
      if(err){
        console.log("error here");
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      };

      console.log("message remove 1.5");

      res.status(200).json({
        message: 'Deleted message',
        obj: result
      });
      console.log("message remove 2");
    })
  })
})


module.exports = router;
