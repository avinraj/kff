import React, { Component } from 'react';
import classes from "./header.module.css";
import Logo from "../../images/Logo.jpg";
class Header extends Component{
    render(){
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark shadow rounded-3 position-relative">
        <p className={classes.tagLine}> Fresh from the farm... </p>
   </nav>
      <img className={classes.logo} src={Logo} alt="" />
            </div>
        )
    }
}
export default Header;