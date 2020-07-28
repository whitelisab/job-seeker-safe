import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

import sampleData from '../sampleData.js';
import ListItem from './ListItem.jsx';
import AddNewModal from './AddNewModal.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: sampleData,
      isLoaded: false,
      error: null,
    };
    this.addNewJob = this.addNewJob.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
  }

  componentDidMount() {
    axios.get('/jobs')
      .then((response) => {
        // console.log(response.data.jobs);
        this.setState({
          jobs: response.data.jobs,
          isLoaded: true,
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

  render() {
    const { jobs, error, isLoaded } = this.state;
    if (error) {
      return <Container>Error</Container>;
    }
    if (!isLoaded) {
      return <Container>Loading...</Container>;
    }
    return (
      <Container>
        <Row className="my-3">
          <Col>
            <h4 className="ml-2">My job applications</h4>
          </Col>
          <Col>
            <AddNewModal addNewJob={this.addNewJob} />
          </Col>
        </Row>
        <Table striped borderless hover>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Job Link</th>
              <th>Status</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          {jobs.map((job) => <ListItem job={job} key={job._id} deleteJob={this.deleteJob} />)}
        </Table>
      </Container>
    );
  }
}

export default List;
