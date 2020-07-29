const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const db = require('./database/index.js');
const jwtKey = require('../config.js');

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
// app.use(session({
//   key: 'email',
//   secret: 'sesh',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     expires: 600000,
//   },
// }));

// app.use((req, res, next) => {
//   if (req.cookies.email && !req.session.user) {
//     res.clearCookie('email');
//   }
//   next();
// });

// const sessionChecker = (req, res, next) => {
//   if (req.session.user && req.cookies.email) {
//     res.redirect('/');
//   } else {
//     next();
//   }
// };

app.use(express.static('client/dist'));

// app.get('/', sessionChecker, (req, res) => {
//   res.redirect('/login');
// });

app.get('/jobs', (req, res) => {
  const query = db.Job.find({ });
  query.exec((err, results) => {
    if (err) {
      console.log('error getting from db');
      res.status(400).json({
        err,
      });
    } else {
      console.log('got jobs from db');
      res.status(200).json({
        jobs: results,
      });
    }
  });
});

app.get('/jobs/:id', (req, res) => {
  const user_id = req.params.id;
  const query = db.Job.find({ user_id });
  query.exec((err, results) => {
    if (err) {
      console.log('error getting users jobs from db');
      res.status(400).json({
        err,
      });
    } else {
      console.log('got users jobs from db');
      res.status(200).json({
        jobs: results,
      });
    }
  });
});

app.post('/jobs', (req, res) => {
  const job = req.body;
  const user_id = job.user_id || 1;
  console.log(req);
  const newJob = new db.Job({
    // _id: new mongoose.Types.ObjectId(),
    job_title: job.job_title,
    company: job.company,
    url: job.url,
    status: job.status,
    date: job.date,
    user_id,
  });
  newJob.save((err, data) => {
    if (err) {
      console.log('error adding job to db');
      res.status(400).json({
        err,
      });
    } else {
      console.log('saved job to db', data);
      res.status(201).json({
        job: data,
      });
    }
  });
});

app.delete('/jobs/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  const query = db.Job.deleteOne({ _id: id });
  query.exec((err, results) => {
    if (err) {
      console.log('error deleting from db');
      res.status(400).json({
        err,
      });
    } else {
      console.log('deleted from db');
      res.status(200).json({
        _id: id,
        results,
      });
    }
  });
});

app.put('/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = req.body;
  const user_id = job.user_id || 1;
  console.log(id);
  const query = db.Job.updateOne({ _id: id }, {
    job_title: job.job_title,
    company: job.company,
    url: job.url,
    status: job.status,
    date: job.date,
    user_id,
  });
  query.exec((err, results) => {
    if (err) {
      console.log('error updating db record');
      res.status(400).json({
        err,
      });
    } else {
      console.log('updated in db');
      res.status(200).json({
        _id: id,
        results,
      });
    }
  });
});

app.post('/register', (req, res) => {
  const query = db.User.findOne({ email: req.body.email });
  query.exec((err, results) => {
    if (err) {
      console.log('error finding user in db');
      res.status(400).json({
        err,
      });
    } else if (results) {
      console.log('user already in db');
      res.status(400).json({ email: 'Email already exists' });
    } else {
      const newUser = new db.User({
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) {
            console.log('error hashing');
          } else {
            newUser.password = hash;
            newUser.save((err1, data) => {
              if (err1) {
                console.log('error adding user to db');
                res.status(400).json({
                  err,
                });
              } else {
                console.log('saved user to db', data);
                res.status(201).json({
                  user: data,
                });
              }
            });
          }
        });
      });
    }
  });
});

app.post('/login', (req, res) => {
  const query = db.User.findOne({ email: req.body.email });
  console.log('logging from login');
  query.exec((err, results) => {
    if (err) {
      console.log('error finding user in db');
      res.status(400).json({
        err,
      });
    } else if (!results) {
      console.log('user not found in db');
      res.status(400).json({ email: 'Email not found' });
    } else {
      console.log('user found', results.password);
      bcrypt.compare(req.body.password, results.password, (error, result) => {
        if (result) {
          // passwords match
          const payload = {
            email: results.email,
          };
          const token = jwt.sign(
            payload,
            jwtKey.jwtKey,
            {
              algorithm: 'HS256',
              expiresIn: 6000000,
            },
          );
          // console.log('token', token);
          // res.cookie('token', token);
          // res.end();
          res.status(201).json({
            user: {
              email: results.email,
              _id: results._id,
              token,
            },
          });
        } else {
          res.status(400).json({
            pass: 'Password incorrect',
          });
        }
      });
    }
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
