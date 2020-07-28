import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

class DeleteModal extends React.Component {
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
    const { deleteJob, job } = this.props;
    return (
      <>
        <Button variant="secondary" className="mr-2" onClick={this.handleShow} id={job._id}>Delete</Button>
        <Modal show={show} onHide={this.handleClose} backdrop="static" keyboard={false}>
          <Modal.Header>
            <Modal.Title>
              Warning
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this job? This action cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={deleteJob} id={job._id}>Delete</Button>
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

DeleteModal.propTypes = {
  job: PropTypes.shape({
    job_title: PropTypes.string,
    company: PropTypes.string,
    url: PropTypes.string,
    status: PropTypes.string,
    date: PropTypes.string,
    _id: PropTypes.string,
  }),
  deleteJob: PropTypes.func.isRequired,
};

DeleteModal.defaultProps = {
  job: {},
};

export default DeleteModal;
