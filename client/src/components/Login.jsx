import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
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
    axios.post('/login', {
      email,
      password,
    })
      .then((response) => {
        console.log('res from login', response.data);
        this.setState({
          isLoggedIn: true,
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
      isLoggedIn,
    } = this.state;
    if (isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <Container>
        <Row className="my-2">
          <h3>Job Seeker Safe: Login</h3>
        </Row>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formLoginEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" value={email} name="email" onChange={this.handleChange} required />
          </Form.Group>
          <Form.Group controlId="formLoginPass">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" value={password} name="password" onChange={this.handleChange} required />
          </Form.Group>
          <Button type="submit" variant="primary">Login</Button>
        </Form>
        <Row className="my-2">
          <Link to="/login">Need to create an account?</Link>
        </Row>
      </Container>
    );
  }
}

export default Login;
