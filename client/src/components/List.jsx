import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axios from 'axios';

// import sampleData from '../sampleData.js';
import ListItem from './ListItem.jsx';
import AddNewModal from './AddNewModal.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
      isLoaded: false,
      error: null,
      currentUser: {},
    };
    this.addNewJob = this.addNewJob.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
    this.updateJob = this.updateJob.bind(this);
    this.handleSortDescend = this.handleSortDescend.bind(this);
    this.handleSortAscend = this.handleSortAscend.bind(this);
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('user', user);
    axios.get(`/jobs/${user._id}`)
      .then((response) => {
        // console.log(response.data.jobs);
        this.setState({
          jobs: response.data.jobs,
          isLoaded: true,
          currentUser: user,
        });
      })
      .catch((error) => {
        // console.log(error);
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }

  addNewJob(job) {
    console.log('addnewfunc', job);
    const { jobs } = this.state;
    const newJobs = jobs.concat(job);
    this.setState({
      isLoaded: true,
      jobs: newJobs,
    });
  }

  deleteJob(event) {
    const jobId = event.target.id;
    console.log('delete', jobId);
    const { jobs } = this.state;
    const newJobs = jobs.filter((job) => (job._id !== jobId));
    console.log('new jobs', newJobs);
    axios.delete(`/jobs/${jobId}`)
      .then((response) => {
        console.log('deleted response', response.data);
        this.setState({
          isLoaded: true,
          jobs: newJobs,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateJob(updatedJob) {
    console.log('updateJob func', updatedJob);
    const { jobs } = this.state;
    console.log(jobs);
    const updatedJobs = jobs.map((job) => {
      if (job._id === updatedJob._id) {
        return {
          _id: updatedJob._id,
          job_title: updatedJob.job_title,
          company: updatedJob.company,
          url: updatedJob.url,
          status: updatedJob.status,
          date: updatedJob.date,
          user_id: job.user_id,
        };
      }
      return job;
    });
    console.log('updated jobs', updatedJobs);
    this.setState({
      isLoaded: true,
      jobs: updatedJobs,
    });
    axios.put(`/jobs/${updatedJob._id}`, {
      job_title: updatedJob.job_title,
      company: updatedJob.company,
      url: updatedJob.url,
      status: updatedJob.status,
      date: updatedJob.date,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSortDescend(event) {
    const column = event.target.id;
    const { jobs } = this.state;
    const sortedJobs = [...jobs];
    sortedJobs.sort((a, b) => {
      if (a[column] < b[column]) {
        return -1;
      }
      if (a[column] > b[column]) {
        return 1;
      }
      return 0;
    });
    this.setState({
      jobs: sortedJobs,
    });
  }

  handleSortAscend(event) {
    const column = event.target.id;
    const { jobs } = this.state;
    const sortedJobs = [...jobs];
    sortedJobs.sort((a, b) => {
      if (a[column] > b[column]) {
        return -1;
      }
      if (a[column] < b[column]) {
        return 1;
      }
      return 0;
    });
    this.setState({
      jobs: sortedJobs,
    });
  }

  render() {
    const { jobs, error, isLoaded, currentUser } = this.state;
    if (error) {
      return <Container>Error</Container>;
    }
    if (!isLoaded) {
      return <Container>Loading...</Container>;
    }
    return (
      <Container className="mt-5">
        <Row className="my-3">
          <Col>
            <h4 className="ml-2">My job applications</h4>
          </Col>
          <Col>
            <AddNewModal currentUser={currentUser} addNewJob={this.addNewJob} />
          </Col>
        </Row>
        <Table striped borderless hover>
          <thead>
            <tr>
              <th>
                Job title
                <ButtonGroup className="ml-1" size="sm" aria-label="job title group">
                  <Button id="job_title" size="sm" variant="light" onClick={this.handleSortDescend}>
                    <svg onClick={this.handleSortDescend} id="job_title" width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path onClick={this.handleSortDescend} id="job_title" d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  </Button>
                  <Button id="job_title" size="sm" variant="light" onClick={this.handleSortAscend}>
                    <svg onClick={this.handleSortAscend} id="job_title" width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path onClick={this.handleSortAscend} id="job_title" d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                  </Button>
                </ButtonGroup>
              </th>
              <th>
                Company
                <ButtonGroup className="ml-1" size="sm" aria-label="job title group">
                  <Button id="company" size="sm" variant="light" onClick={this.handleSortDescend}>
                    <svg onClick={this.handleSortDescend} id="company" width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path onClick={this.handleSortDescend} id="company" d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  </Button>
                  <Button id="company" size="sm" variant="light" onClick={this.handleSortAscend}>
                    <svg onClick={this.handleSortDescend} id="company" width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path onClick={this.handleSortDescend} id="company" d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                  </Button>
                </ButtonGroup>
              </th>
              <th>
                Status
                <ButtonGroup className="ml-1" size="sm" aria-label="job title group">
                  <Button id="status" size="sm" variant="light" onClick={this.handleSortDescend}>
                    <svg onClick={this.handleSortDescend} id="status" width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path onClick={this.handleSortDescend} id="status" d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  </Button>
                  <Button id="status" size="sm" variant="light" onClick={this.handleSortAscend}>
                    <svg onClick={this.handleSortDescend} id="status" width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path onClick={this.handleSortDescend} id="status" d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                  </Button>
                </ButtonGroup>
              </th>
              <th>
                Date added
                <ButtonGroup className="ml-1" size="sm" aria-label="job title group">
                  <Button id="date" size="sm" variant="light" onClick={this.handleSortDescend}>
                    <svg onClick={this.handleSortDescend} id="date" width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path onClick={this.handleSortDescend} id="date" d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  </Button>
                  <Button id="date" size="sm" variant="light" onClick={this.handleSortAscend}>
                    <svg onClick={this.handleSortDescend} id="date" width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path onClick={this.handleSortDescend} id="date" d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                  </Button>
                </ButtonGroup>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => <ListItem job={job} key={job._id} deleteJob={this.deleteJob} updateJob={this.updateJob} />)}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default List;
