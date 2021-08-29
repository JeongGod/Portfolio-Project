import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logoutApi } from "api/auth";
import { initToken } from "reducers/token";
import { useHistory } from "react-router-dom";

/**
 * Link에서 home화면을 "/"로 하면 bootstrap에서 active class가 안빠지게 된다.
 * 그래서 "/home"으로 변경하여 사용한다.
 */

const RacerNav = () => {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const { accessToken } = useSelector((state) => state.token);
  const deleteToken = () => {
    dispatch(initToken());
  }
  
  const handlerLogout = async (e) => {
    e.preventDefault();
    await logoutApi(deleteToken)
    history.replace('/')
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to={accessToken ? "/home" : "/"}>
            <Navbar.Brand>RacerIn</Navbar.Brand>
          </LinkContainer>
          {accessToken && ( 
          <Nav className="me-auto">
            <LinkContainer to="/home">
              <Nav.Link>Main</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/network">
              <Nav.Link>Network</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link onClick={(e) => handlerLogout(e)}>Logout</Nav.Link>
            </LinkContainer>
          </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default RacerNav;
