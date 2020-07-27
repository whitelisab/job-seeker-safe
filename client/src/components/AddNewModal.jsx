import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import AddNewForm from './AddNewForm.jsx';

class AddNewModal extends React.Component {
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
    const { addNewJob } = this.props;
    return (
      <>
        <Button variant="primary" onClick={this.handleShow} className="mr-2 float-right">Add New Job</Button>
        <Modal show={show} onHide={this.handleClose} backdrop="static" keyboard={false}>
          <Modal.Header>
            <Modal.Title>Add New Job</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddNewForm handleClose={this.handleClose} addNewJob={addNewJob} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AddNewModal;
