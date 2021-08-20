import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logoutApi } from "../../api/AuthApi";

/**
 * Link에서 home화면을 "/"로 하면 bootstrap에서 active class가 안빠지게 된다.
 * 그래서 "/home"으로 변경하여 사용한다.
 */

const RacerNav = () => {
  const [login, setLogin] = useState(localStorage.getItem("access_token"));
  console.log(login)
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/home">
            <Navbar.Brand>RacerIn</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/home">
              <Nav.Link>Main</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/network">
              <Nav.Link>Network</Nav.Link>
            </LinkContainer>
            {login === "null" ? (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            ) : (
              <LinkContainer to="/logout">
                <Nav.Link onClick={logoutApi}>Logaaout</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default RacerNav;
