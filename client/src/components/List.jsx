import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

import sampleData from '../sampleData.js';
import ListItem from './ListItem.jsx';
import AddNewModal from './AddNewModal.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: sampleData,
    };
  }

  render() {
    const { jobs } = this.state;
    return (
      <Container>
        <Row className="my-3">
          <Col>
            <h4 className="ml-2">My job applications</h4>
          </Col>
          <Col>
            <AddNewModal />
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
            </tr>
          </thead>
          {jobs.map((job) => <ListItem job={job} key={job.id} />)}
        </Table>
      </Container>
    );
  }
}

export default List;
