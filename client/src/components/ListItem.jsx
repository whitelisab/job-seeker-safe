import React from 'react';

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
    <div>
      <p>{job_title}</p>
      <p>{company}</p>
      <p>{url}</p>
      <p>{status}</p>
      <p>{date}</p>
    </div>
  );
}

export default ListItem;
