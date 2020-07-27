import React from 'react';
import PropTypes from 'prop-types';

function ListItem(props) {
  console.log(props);
  const {
    job_title,
    company,
    url,
    status,
    date,
  } = props.job;
  return (
    <tbody>
      <tr>
        <td>{job_title}</td>
        <td>{company}</td>
        <td><a href={url} target="blank">Job posting</a></td>
        <td>{status}</td>
        <td>{date}</td>
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
};

ListItem.defaultProps = {
  job: {},
};

export default ListItem;
