import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import EditModal from './EditModal.jsx';
import DeleteModal from './DeleteModal.jsx';

function ListItem(props) {
  // console.log(props);
  const { deleteJob, updateJob, job } = props;
  const {
    job_title,
    company,
    url,
    status,
    date,
    _id,
  } = job;
  return (
    <tr>
      <td><a href={url} target="blank">{job_title}</a></td>
      <td>{company}</td>
      <td>{status}</td>
      <td>{date}</td>
      <td>
        <EditModal job={job} updateJob={updateJob} />
        <DeleteModal job={job} deleteJob={deleteJob} />
      </td>
    </tr>
  );
}

ListItem.propTypes = {
  job: PropTypes.shape({
    job_title: PropTypes.string,
    company: PropTypes.string,
    url: PropTypes.string,
    status: PropTypes.string,
    date: PropTypes.string,
    _id: PropTypes.string,
  }),
  deleteJob: PropTypes.func.isRequired,
  updateJob: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  job: {},
};

export default ListItem;
