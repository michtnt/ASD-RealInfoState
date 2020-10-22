import React from 'react';
import {
  AppBar,
  Button,
  Toolbar,
} from '@material-ui/core';
import logo from "../images/bannerlogo.jpg"

const AppHeader = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedInUser') // get current session user

  return(
    <AppBar position="static" >
      <Toolbar title = "Real-InfoState" style={{background: '#222222'}}>
        <a href="/"><img src={logo} alt="RI-Logo" height="70" width="200"/></a>
        &nbsp;&nbsp;&nbsp;
        <a href="/find/suburbs"><Button style={{color: '#FFFFFF', margin: "10px", padding: "10px", fontWeight:"bold" }}>Find Home</Button> </a>  
        <a href="/find/agents"><Button style={{color: '#FFFFFF', margin: "10px", padding: "10px", fontWeight:"bold" }}>Find an Agent</Button> </a>  
        <a href="/news"><Button style={{color: '#FFFFFF', margin: "10px", padding: "10px", fontWeight:"bold" }}>News</Button> </a>  
        <a href="/find/properties"><Button style={{color: '#FFFFFF', margin: "10px", padding: "10px", fontWeight:"bold" }}>Find Properties</Button> </a>  
      </Toolbar>

      <div class="InfoBar" style={{background: '222222'}}>
      { !loggedUserJSON ? <a href="/register"><Button style={{background: '#FFFFFF', float: 'right',  margin: "10px"}}>Register</Button> </a> : <></>}
      { !loggedUserJSON ? <a href="/login"> <Button style={{background: '#FFFFFF', float: 'right',  margin: "10px"}}>Login</Button> </a> : <></>}
      { loggedUserJSON ? <a href="/logout"> <Button style={{background: '#FFFFFF', float: 'right',  margin: "10px"}}>Logout</Button> </a> : <></>} 
      { loggedUserJSON ? <a href="/user/edit"> <Button style={{background: '#FFFFFF', float: 'right',  margin: "10px"}}>Account</Button> </a> : <></>}
      { loggedUserJSON ? <a href="/user/wishlist"> <Button style={{background: '#FFFFFF', float: 'right',  margin: "10px"}}>Wishlist</Button> </a> : <></>}
    </div>
  </AppBar>
  )
};

export default AppHeader;