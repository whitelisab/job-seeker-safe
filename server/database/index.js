const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/job-seeker', { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => { console.log('db connected'); },
  (err) => { console.log('error connecting to db', err); },
);

const { Schema } = mongoose;

const jobSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  job_title: String,
  company: String,
  url: String,
  status: String,
  date: String,
  user_id: Number,
});

const userSchema = new Schema({
  email: String,
  password: String,
});

const Job = mongoose.model('Job', jobSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  Job,
  User,
};
