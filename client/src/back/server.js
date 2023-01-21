var express = require("express");
var app = express();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var multer = require('multer'),
  bodyParser = require('body-parser'),
  path = require('path');
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/productDB");
var fs = require('fs');
var user = require("./inst_users.js");
var student=require("./stu_users.js");
var verifier = require("./verify_users.js");
app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));
app.listen(5000, () =>{ console.log('Server started on port '+5000);});

// app.use("/", (req, res, next) => {
//     console.log("In here");
// })
  
app.post("/login", (req, res) => {
    try {
      if (req.body && req.body.username && req.body.password) {
        user.find({ username: req.body.username }, (err, data) => {
          if (data.length > 0) {
  
            if (bcrypt.compareSync(data[0].password, req.body.password)) {
              checkUserAndGenerateToken(data[0], req, res);
            } else {
  
              res.status(400).json({
                errorMessage: 'Username or password is incorrect!',
                status: false
              });
            }
  
          } else {
            res.status(400).json({
              errorMessage: 'Username or password is incorrect!',
              status: false
            });
          }
        })
      } else {
        res.status(400).json({
          errorMessage: 'Add proper parameter first!',
          status: false
        });
      }
    } catch (e) {
      res.status(400).json({
        errorMessage: 'Something went wrong!',
        status: false
      });
    }
  
  });
  
  /* register api */
  app.post("/register", (req, res) => {
    console.log("In here");
    try {
      if (req.body && req.body.username && req.body.password) {
  
        user.find({ username: req.body.username }, (err, data) => {
  
          if (data.length == 0) {
  
            let User = new user({
              username: req.body.username,
              password: req.body.password
            });
            User.save((err, data) => {
              if (err) {
                res.status(400).json({
                  errorMessage: err,
                  status: false
                });
              } else {
                res.status(200).json({
                  status: true,
                  title: 'Registered Successfully.'
                });
              }
            });
  
          } else {
            res.status(400).json({
              errorMessage: `UserName ${req.body.username} Already Exist!`,
              status: false
            });
          }
  
        });
  
      } else {
        res.status(400).json({
          errorMessage: 'Add proper parameter first!',
          status: false
        });
      }
    } catch (e) {
      res.status(400).json({
        errorMessage: 'Something went wrong!',
        status: false
      });
    }
  });
  
  function checkUserAndGenerateToken(data, req, res) {
    jwt.sign({ user: data.username, id: data._id }, 'shhhhh11111', { expiresIn: '1d' }, (err, token) => {
      if (err) {
        res.status(400).json({
          status: false,
          errorMessage: err,
        });
      } else {
        res.json({
          message: 'Login Successfully.',
          token: token,
          status: true
        });
      }
    });
  }
  


  app.post("/login1", (req, res) => {
    try {
      if (req.body && req.body.username && req.body.password) {
        student.find({ username: req.body.username }, (err, data) => {
          if (data.length > 0) {
  
            if (bcrypt.compareSync(data[0].password, req.body.password)) {
              checkUserAndGenerateToken(data[0], req, res);
            } else {
  
              res.status(400).json({
                errorMessage: 'Username or password is incorrect!',
                status: false
              });
            }
  
          } else {
            res.status(400).json({
              errorMessage: 'Username or password is incorrect!',
              status: false
            });
          }
        })
      } else {
        res.status(400).json({
          errorMessage: 'Add proper parameter first!',
          status: false
        });
      }
    } catch (e) {
      res.status(400).json({
        errorMessage: 'Something went wrong!',
        status: false
      });
    }
  
  });
  
  /* register api */
  app.post("/register1", (req, res) => {
    console.log("In here");
    try {
      if (req.body && req.body.username && req.body.password) {
  
        student.find({ username: req.body.username }, (err, data) => {
  
          if (data.length == 0) {
  
            let Student = new student({
              username: req.body.username,
              password: req.body.password
            });
            Student.save((err, data) => {
              if (err) {
                res.status(400).json({
                  errorMessage: err,
                  status: false
                });
              } else {
                res.status(200).json({
                  status: true,
                  title: 'Registered Successfully.'
                });
              }
            });
  
          } else {
            res.status(400).json({
              errorMessage: `UserName ${req.body.username} Already Exist!`,
              status: false
            });
          }
  
        });
  
      } else {
        res.status(400).json({
          errorMessage: 'Add proper parameter first!',
          status: false
        });
      }
    } catch (e) {
      res.status(400).json({
        errorMessage: 'Something went wrong!',
        status: false
      });
    }
  });
  
  function checkUserAndGenerateToken(data, req, res) {
    jwt.sign({ user: data.username, id: data._id }, 'shhhhh11111', { expiresIn: '1d' }, (err, token) => {
      if (err) {
        res.status(400).json({
          status: false,
          errorMessage: err,
        });
      } else {
        res.json({
          message: 'Login Successfully.',
          token: token,
          status: true
        });
      }
    });
  }

  app.post("/login2", (req, res) => {
    try {
      if (req.body && req.body.username && req.body.password) {
        verifier.find({ username: req.body.username }, (err, data) => {
          if (data.length > 0) {
  
            if (bcrypt.compareSync(data[0].password, req.body.password)) {
              checkUserAndGenerateToken(data[0], req, res);
            } else {
  
              res.status(400).json({
                errorMessage: 'Username or password is incorrect!',
                status: false
              });
            }
  
          } else {
            res.status(400).json({
              errorMessage: 'Username or password is incorrect!',
              status: false
            });
          }
        })
      } else {
        res.status(400).json({
          errorMessage: 'Add proper parameter first!',
          status: false
        });
      }
    } catch (e) {
      res.status(400).json({
        errorMessage: 'Something went wrong!',
        status: false
      });
    }
  
  });
  
  /* register api */
  app.post("/register2", (req, res) => {
    console.log("In here");
    try {
      if (req.body && req.body.username && req.body.password) {
  
        verifier.find({ username: req.body.username }, (err, data) => {
  
          if (data.length == 0) {
  
            let Verifier = new verifier({
              username: req.body.username,
              password: req.body.password
            });
            Verifier.save((err, data) => {
              if (err) {
                res.status(400).json({
                  errorMessage: err,
                  status: false
                });
              } else {
                res.status(200).json({
                  status: true,
                  title: 'Registered Successfully.'
                });
              }
            });
  
          } else {
            res.status(400).json({
              errorMessage: `UserName ${req.body.username} Already Exist!`,
              status: false
            });
          }
  
        });
  
      } else {
        res.status(400).json({
          errorMessage: 'Add proper parameter first!',
          status: false
        });
      }
    } catch (e) {
      res.status(400).json({
        errorMessage: 'Something went wrong!',
        status: false
      });
    }
  });
  
  function checkUserAndGenerateToken(data, req, res) {
    jwt.sign({ user: data.username, id: data._id }, 'shhhhh11111', { expiresIn: '1d' }, (err, token) => {
      if (err) {
        res.status(400).json({
          status: false,
          errorMessage: err,
        });
      } else {
        res.json({
          message: 'Login Successfully.',
          token: token,
          status: true
        });
      }
    });
  }
  
  