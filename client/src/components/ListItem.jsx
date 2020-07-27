import React from 'react';
import { Table } from 'react-bootstrap';

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
        <td>{url}</td>
        <td>{status}</td>
        <td>{date}</td>
      </tr>
    </tbody>
    // <div>
    //   <p>{job_title}</p>
    //   <p>{company}</p>
    //   <p>{url}</p>
    //   <p>{status}</p>
    //   <p>{date}</p>
    // </div>
  );
}

export default ListItem;
