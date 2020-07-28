import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

class EditForm extends React.Component {
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

  componentDidMount() {
    const { job } = this.props;
    const {
      job_title,
      company,
      url,
      status,
      date,
    } = job;
    this.setState({
      job_title,
      company,
      url,
      status,
      date,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { handleClose, updateJob, job } = this.props;
    const {
      job_title,
      company,
      url,
      status,
      date,
    } = this.state;
    const updated = {
      _id: job._id,
      job_title,
      company,
      url,
      status,
      date,
    };
    console.log('updated!', updated);
    updateJob(updated);
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
            <option value="Applied">Applied</option>
            <option value="Interviewed">Interviewed</option>
            <option value="Received Offer">Recevied Offer</option>
            <option value="Accepted Offer">Accepted Offer</option>
            <option value="Declined Offer">Declined Offer</option>
            <option value="Rejected">Rejected</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formDate">
          <Form.Label>Date Added</Form.Label>
          <Form.Control type="date" value={date} name="date" onChange={this.handleChange} required />
        </Form.Group>
        <Button type="submit" variant="primary">Save Changes</Button>
      </Form>
    );
  }
}

EditForm.propTypes = {
  job: PropTypes.shape({
    job_title: PropTypes.string,
    company: PropTypes.string,
    url: PropTypes.string,
    status: PropTypes.string,
    date: PropTypes.string,
    _id: PropTypes.string,
  }),
  handleClose: PropTypes.func.isRequired,
  updateJob: PropTypes.func.isRequired,
};

EditForm.defaultProps = {
  job: {},
};

export default EditForm;
