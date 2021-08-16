import RacerNav from './components/navbar/RacerNav'
import MainPage from './components/main/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import './App.css';

const AppWrapper = styled.div`
  background-color: darkgray;
`

function App() {
  return (
    <AppWrapper>
      <RacerNav />
      <MainPage />
    </AppWrapper>
  );
}

export default App;
