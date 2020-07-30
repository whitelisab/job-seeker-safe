import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      hasAccount: false,
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
    axios.post('/register', {
      email,
      password,
    })
      .then((response) => {
        console.log('res from register', response.data);
        this.setState({
          hasAccount: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      email,
      password,
      hasAccount,
    } = this.state;
    if (hasAccount) {
      return <Redirect to="/login" />;
    }
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
            <Form.Control type="password" value={password} name="password" onChange={this.handleChange} required />
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
