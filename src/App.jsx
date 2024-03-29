import {RecoilRoot} from "recoil";
import './App.css';
import { Router } from "./router/router";
import {BrowserRouter } from "react-router-dom";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
