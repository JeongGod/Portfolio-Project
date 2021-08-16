import RacerNav from "./components/navbar/RacerNav";
import MainPage from "./components/main/MainPage";
import NetworkPage from "./components/network/NetworkPage";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import "./App.css";

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
        <Route path="/network">
          <NetworkPage />
        </Route>
        <Route path="/logout"></Route>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
