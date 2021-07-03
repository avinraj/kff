import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Header from "./components/header/header";
import TanksHome from "./components/Tanks-Home/tanksHome";
import AddSale from "./components/Add-sale/addSale";
import CurrentSale from "./components/current-sales/currentSales";
import Login from "./components/login/login";
import { AuthInterceptors } from "./Utils/auth-interceptors";
import {reducer,initialState} from "./reducers/useReducer";
export const UserContext = createContext();
const Routing = () => {
  const history = useHistory();
  const {dispatch} = useContext(UserContext);
  useEffect(()=>{
const user = localStorage.getItem("jwt");
if(user){
  dispatch({type: "USER",payload: user})
  history.push({pathname:`/`})
}else{
  history.push({pathname: `/login`})
}
  },[])
return (
  <Switch>
  <Route path="/login" component={Login} />
      <Route exact path="/" component={TanksHome} />
      <Route path="/Add-Sale/:ID" component={AddSale} />
      <Route path="/Current-Sales/:ID" component={CurrentSale} />
  </Switch>
)
};
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
     <Router>
    <AuthInterceptors />
      <div className="mainDiv">
        <Header />
      <Routing/>
      </div>
    </Router>
    </UserContext.Provider>
  );
}
export default App;
