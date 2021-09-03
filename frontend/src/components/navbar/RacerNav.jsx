import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Navbar, Nav, Container } from "react-bootstrap";
import { logoutApi } from "api/auth";
import { initToken } from "reducers/token";
import { useHistory, Link } from "react-router-dom";

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
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to={accessToken ? "/home" : "/"}>
          RacerIn
        </Navbar.Brand>
        {accessToken && (
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Main
            </Nav.Link>
            <Nav.Link as={Link} to="/network">
              Network
            </Nav.Link>
            <Nav.Link as={Link} to="#" onClick={(e) => handlerLogout(e)}>
              Logout
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default RacerNav;
