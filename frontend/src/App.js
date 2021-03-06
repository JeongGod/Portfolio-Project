import RacerNav from "./components/navbar/RacerNav";
import MainPage from "./components/pages/main/MainPage";
import NetworkPage from "./components/pages/network/NetworkPage";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import "./App.css";
import Login from "./components/pages/login/Login";
import SignUp from "./components/pages/login/Signup";

const AppWrapper = styled.div`

`;

function App() {
  return (
    <AppWrapper>
      <BrowserRouter>
        <RacerNav />
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home">
          <MainPage />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/network">
          <NetworkPage />
        </Route>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
