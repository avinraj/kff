import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/header/header";
import TanksHome from "./components/Tanks-Home/tanksHome";
import AddSale from "./components/Add-sale/addSale";
function App() {
  return (
    <Router>
      <div className="mainDiv">
        <Header />
         <Route exact path="/" component={TanksHome} />
        <Route path="/Add-Sale/:id/:mmyy" component={AddSale} />
      </div>
    </Router>
  );
}
export default App;
