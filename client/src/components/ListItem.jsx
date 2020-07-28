import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

function ListItem(props) {
  // console.log(props);
  const { deleteJob, job } = props;
  const {
    job_title,
    company,
    url,
    status,
    date,
    _id,
  } = job;
  return (
    <tbody>
      <tr>
        <td>{job_title}</td>
        <td>{company}</td>
        <td><a href={url} target="blank">Job posting</a></td>
        <td>{status}</td>
        <td>{date}</td>
        <td>
          <Button variant="secondary" className="mr-2" id={_id}>Edit</Button>
          <Button variant="secondary" onClick={deleteJob} id={_id}>Delete</Button>
        </td>
      </tr>
    </tbody>
  );
}

ListItem.propTypes = {
  job: PropTypes.shape({
    job_title: PropTypes.string,
    company: PropTypes.string,
    url: PropTypes.string,
    status: PropTypes.string,
    date: PropTypes.string,
  }),
  deleteJob: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  job: {},
};

export default ListItem;
