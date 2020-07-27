const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./database/index.js');

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('client/dist'));

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

app.post('/jobs', (req, res) => {
  const job = req.body;
  const user_id = job.user_id || 1;
  console.log(req);
  const newJob = new db.Job ({
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

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
