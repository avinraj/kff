import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/header/header";
import TanksHome from "./components/Tanks-Home/tanksHome";
import AddSale from "./components/Add-sale/addSale";
import CurrentSale from "./components/current-sales/currentSales";
function App() {
  return (
    <Router>
      <div className="mainDiv">
        <Header />
         <Route exact path="/" component={TanksHome} />
        <Route path="/Add-Sale/:ID" component={AddSale} />
        <Route path="/Current-Sales/:ID" component={CurrentSale} />
      </div>
    </Router>
  );
}
export default App;
