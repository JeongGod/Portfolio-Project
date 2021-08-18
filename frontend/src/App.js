import RacerNav from "./components/navbar/RacerNav";
import MainPage from "./components/main/MainPage";
import NetworkPage from "./components/network/NetworkPage";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/Signup";

const AppWrapper = styled.div`
  background-color: darkgray;
`;

function App() {
  return (
    <AppWrapper>
      <BrowserRouter>
        <RacerNav />
        <Route exact path="/home">
          <MainPage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/network">
          <NetworkPage />
        </Route>
        <Route path="/logout"></Route>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
