import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class AddNewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job_title: '',
      company: '',
      url: '',
      status: '',
      date: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }), console.log(this.state);
  }

  handleSubmit(event) {
    const { handleClose } = this.props;
    event.preventDefault();
    console.log('submitted!', this.state);
    handleClose();
  }

  render() {
    const {
      job_title,
      company,
      url,
      status,
      date,
    } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formTextJobTitle">
          <Form.Label>Job Title</Form.Label>
          <Form.Control type="text" placeholder="Enter job title" value={job_title} name="job_title" onChange={this.handleChange} required />
        </Form.Group>
        <Form.Group controlId="formTextCompany">
          <Form.Label>Company</Form.Label>
          <Form.Control type="text" placeholder="Enter company name" value={company} name="company" onChange={this.handleChange} required />
        </Form.Group>
        <Form.Group controlId="formTextLink">
          <Form.Label>Job Link</Form.Label>
          <Form.Control type="text" placeholder="Enter job link" value={url} name="url" onChange={this.handleChange} required />
        </Form.Group>
        <Form.Group controlId="formSelectStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control as="select" value={status} name="status" onChange={this.handleChange} required>
            <option>Applied</option>
            <option>Interviewed</option>
            <option>Recevied Offer</option>
            <option>Accepted</option>
            <option>Declined Offer</option>
            <option>Rejected</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formDate">
          <Form.Label>Date Added</Form.Label>
          <Form.Control type="date" value={date} name="date" onChange={this.handleChange} required />
        </Form.Group>
        <Button type="submit" variant="primary">Add Job</Button>
      </Form>
    );
  }
}

export default AddNewForm;
