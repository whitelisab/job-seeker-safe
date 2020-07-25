import React from 'react';

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
      <div>
        <h3>My job applications</h3>
        {jobs.map((job) => <ListItem job={job} key={job.id} />)}
      </div>
    );
  }
}

export default List;
