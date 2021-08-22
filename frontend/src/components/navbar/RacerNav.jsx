import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logoutApi } from "api/authApi";
import { initToken } from "reducers/token";

/**
 * Link에서 home화면을 "/"로 하면 bootstrap에서 active class가 안빠지게 된다.
 * 그래서 "/home"으로 변경하여 사용한다.
 */

const RacerNav = () => {
  
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.token);
  const deleteToken = () => {
    dispatch(initToken());
  }
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
            <LinkContainer to="/login">
            {accessToken === undefined ? (
                <Nav.Link>Login</Nav.Link>
            ) : (
                <Nav.Link onClick={() => logoutApi(deleteToken)}>Logout</Nav.Link>
            )}
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default RacerNav;
