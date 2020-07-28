const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
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

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
