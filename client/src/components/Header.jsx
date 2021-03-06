import React from 'react';
import { Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Redirect, useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory();

  function handleLogout() {
    console.log('logout');
    localStorage.removeItem('user');
    history.push('/');
  }

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <Navbar bg="light" className="justify-content-between">
            <Navbar.Brand>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 48 48" className="logo" width="50px">
                <g id="XMLID_755_">
                  <path className="segment-fill" id="XMLID_758_" d="M38,3H10C7.2,3,5,5.2,5,8v28c0,2.8,2.2,5,5,5h1v3c0,0.6,0.4,1,1,1h4c0.6,0,1-0.4,1-1v-3h14v3   c0,0.6,0.4,1,1,1h4c0.6,0,1-0.4,1-1v-3h1c2.8,0,5-2.2,5-5V8C43,5.2,40.8,3,38,3z M15,43h-2v-2h2V43z M35,43h-2v-2h2V43z M41,36   c0,1.7-1.3,3-3,3H10c-1.7,0-3-1.3-3-3V8c0-1.7,1.3-3,3-3h28c1.7,0,3,1.3,3,3V36z" />
                  <path className="segment-fill" id="XMLID_763_" d="M36,9H12c-0.6,0-1,0.4-1,1v3h-1c-0.6,0-1,0.4-1,1v4c0,0.6,0.4,1,1,1h1v6h-1c-0.6,0-1,0.4-1,1   v4c0,0.6,0.4,1,1,1h1v3c0,0.6,0.4,1,1,1h24c0.6,0,1-0.4,1-1V10C37,9.4,36.6,9,36,9z M11,15h2v2h-1c0,0,0,0,0,0s0,0,0,0h-1V15z    M11,27h2v2h-2V27z M35,33H13v-2h1c0.6,0,1-0.4,1-1v-4c0-0.6-0.4-1-1-1h-1v-6h1c0.6,0,1-0.4,1-1v-4c0-0.6-0.4-1-1-1h-1v-2h22V33z" />
                  <path className="segment-fill" id="XMLID_768_" d="M24,29c1.8,0,3.6-0.7,4.9-2c2.7-2.7,2.7-7.2,0-9.9c-2.7-2.7-7.2-2.7-9.9,0   c-2.7,2.7-2.7,7.2,0,9.9C20.4,28.3,22.2,29,24,29z M20.5,18.5c1-1,2.3-1.5,3.5-1.5s2.6,0.5,3.5,1.5c1.9,1.9,1.9,5.1,0,7.1   c-1.9,1.9-5.1,1.9-7.1,0C18.5,23.6,18.5,20.4,20.5,18.5z" />
                  <path className="segment-fill" id="XMLID_769_" d="M21.9,24.1c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l0.7-0.7l0.7,0.7c0.2,0.2,0.5,0.3,0.7,0.3   s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L25.4,22l0.7-0.7c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L24,20.6l-0.7-0.7c-0.4-0.4-1-0.4-1.4,0   s-0.4,1,0,1.4l0.7,0.7l-0.7,0.7C21.5,23.1,21.5,23.7,21.9,24.1z" />
                </g>
              </svg>
              {' '}
              Job Seeker Safe
            </Navbar.Brand>
            <Nav>
              <NavDropdown title="My account" id="my-account">
                <NavDropdown.Item as="button" onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
