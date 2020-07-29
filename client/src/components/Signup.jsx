import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      email,
      password,
    } = this.state;
  }

  render() {
    const {
      email,
      password,
    } = this.state;
    return (
      <Container>
        <Row className="my-2">
          <h3>Job Seeker Safe: Register for a new Account</h3>
        </Row>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formSignupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" value={email} name="email" onChange={this.handleChange} required />
          </Form.Group>
          <Form.Group controlId="formSignupPass">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" value={password} name="password" onChange={this.handleChange} required />
          </Form.Group>
          <Button type="submit" variant="primary">Sign Up</Button>
        </Form>
        <Row className="my-2">
          <Link to="/login">Already have an account?</Link>
        </Row>
      </Container>
    );
  }
}

export default Signup;
