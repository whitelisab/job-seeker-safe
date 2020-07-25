import React from 'react';
import Container from 'react-bootstrap/Container';

import sampleData from '../sampleData.js';
import ListItem from './ListItem.jsx';

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
        <h3>My job applications</h3>
        {jobs.map((job) => <ListItem job={job} key={job.id} />)}
      </Container>
    );
  }
}

export default List;
