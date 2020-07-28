import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

import EditForm from './EditForm.jsx';

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleShow() {
    this.setState({
      show: true,
    });
  }

  handleClose() {
    this.setState({
      show: false,
    });
  }

  render() {
    const { show } = this.state;
    const { updateJob, job } = this.props;
    return (
      <>
        <Button variant="secondary" className="mr-2" onClick={this.handleShow} id={job.id}>Edit</Button>
        <Modal show={show} onHide={this.handleClose} backdrop="static" keyboard={false}>
          <Modal.Header>
            <Modal.Title>
              Edit Job: {job.job_title} - {job.company}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditForm updateJob={updateJob} handleClose={this.handleClose} job={job} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

EditModal.propTypes = {
  job: PropTypes.shape({
    job_title: PropTypes.string,
    company: PropTypes.string,
    url: PropTypes.string,
    status: PropTypes.string,
    date: PropTypes.string,
  }),
  updateJob: PropTypes.func.isRequired,
};

EditModal.defaultProps = {
  job: {},
};

export default EditModal;
