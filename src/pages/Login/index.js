// User can login to the system
import React, { useState } from 'react';
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Typography,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import service from '../../utils/token';

const useStyles = makeStyles({
  App: {
    textAlign: 'center',
    backgroundColor: "#ffffff",
},
  Appheader: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    color: "white"
},
   Login: {
     display: "flex",
     flexDirection: "column",
     alignItems: "center",
     justifyContent: "center", 
     padding: "50px"
},
     Button: {
    padding: "40px"
}
});

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false)

    const signIn = () => { 
      if(!username || !password){ 
        setMessage("Missing required field!");             
        setOpen(true);      
      }
      else{
        const user = axios.post('http://localhost:3001/auth/login/', {"username" : username, "password" : password, "type" : 'user'})
        .then(response => {
          if(response.data.loginAttempts){ // if there is more than 5 unsuccessful attempt
            setMessage('Account locked as there is more than 5 unsuccessful attempts!')
            setOpen(true)
          } else{
          window.localStorage.setItem('loggedInUser', JSON.stringify(response.data.user))
          service.setToken(user.token)

          setUsername('');
          setPassword('');
          setMessage('Login successful!')
          setOpen(true)

          // go to user home
          setTimeout(() => {
            window.location = "/home"
          },1000)
        }      
      }).catch(error => {
          setMessage('Wrong credentials!')
          setOpen(true)
          setTimeout(() => {
            setMessage(null);
            setOpen(false)
          },5000)
        })
      }
    };

    const classes = useStyles();  

        return (
          <div className={classes.App}>
            <Typography variant="h5">Real-InfoState User Login:</Typography>
            <header className={classes.Appheader}>
              <div className={classes.Login}>
                <TextField
                  variant="standard"
                  placeholder="Username"
                  margin="normal"
                  required
                  onChange={(event) => {setUsername(event.target.value)}}
                  value={username}
                /> &nbsp;&nbsp;&nbsp;
                <TextField
                  variant="standard"
                  placeholder="Password"
                  margin="normal"
                  required
                  type="password"
                  onChange={(event) => {setPassword(event.target.value)}}
                  value={password}
                />
    
                <div className={classes.Button}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      signIn();
                    }}
                  >
                    Log In
                  </Button>
                </div>
              </div>
              <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">Sign In</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {message}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpen(false)} color="primary">
                    Okay
                  </Button>
                </DialogActions>
              </Dialog>
            </header>
          </div>
        );
}

export default Login;