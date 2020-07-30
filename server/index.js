const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const db = require('./database/index.js');
const jwtKey = require('../config.js');

let port = process.env.PORT;
if (port == null || port == '') {
  port = 3000;
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static('client/dist'));

// GET all jobs
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

// GET jobs for a particular user
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

// POST new job
app.post('/jobs', (req, res) => {
  const job = req.body;
  console.log(req);
  const newJob = new db.Job({
    job_title: job.job_title,
    company: job.company,
    url: job.url,
    status: job.status,
    date: job.date,
    user_id: job.user_id,
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

// DELETE job
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

// PUT update/edit job
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

// POST new user
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

// POST login to user account
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
          // passwords match, create token
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

// GET for all endpoints to have index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => console.log(`listening on port ${port}`));
