// Admin can edit registered users after they are logged in
import React, { useState, useEffect } from 'react';
import {
  makeStyles
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from 'axios';
  
const useStyles = makeStyles({
    button: {
      margin: 10
    }
});

const UserEdit = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('') // error message
  const [open, setOpen] = useState(false) // open prompt
  const [user, setUser] = useState({}); // current logged in user

  // get current logged in user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        axios
        .get(`http://localhost:3001/users/${user.id}`)
        .then(response => {
          console.log('User are fetched successfully!')
          console.log(response.data)
          setFirstName(response.data[0].firstName)
          setLastName(response.data[0].lastName)
          setEmail(response.data[0].email)
          setUsername(response.data[0].username)
          setAddress(response.data[0].address)
        })     
    }
}, [])

  //update the user data 
  const updateUser = (event) => {
    event.preventDefault()

    // updated user object
    const updateUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      address: address
    }

    axios
    .put(`http://localhost:3001/users/${user.id}`, { user: updateUser } )
    .then(response => {
      console.log('User are updated successsfully')
      window.location='/home'
    })
    .catch(error => {
      setMessage('Users failed to be updated. Please try again.');
      setOpen(true)
    })
  }

    // delete specific user
    const deleteUser = (event) => {
        event.preventDefault();

        if (window.confirm('Are you sure you want to delete your account?')) {
            axios
            .delete(`http://localhost:3001/users/${user.id}`)
            .then(response => {
              console.log('User is deleted successfully')
              window.localStorage.removeItem('loggedOutUser');
              window.localStorage.clear();
              window.location = '/home'
            })
            .catch(error => {
              setMessage('Users failed to be deleted. Please try again.');
              setOpen(true)    
            })
          } else {
            // Do nothing!
          }    
      }
  
  const classes = useStyles();  
  return (
      <form noValidate autoComplete="off">
        <div>
          <TextField 
          required 
          id="standard-required" 
          label="First name" 
          defaultValue="None" 
          value={firstName} 
          onChange={(event) => setFirstName(event.target.value)}/>
          <br />
          <TextField 
          required 
          id="standard" 
          label="Last name"
          defaultValue="None" 
          value={lastName} 
          onChange={(event) => setLastName(event.target.value)} />
          <br />
          <TextField 
          required 
          id="standard-required" 
          label="Email" 
          defaultValue="None" 
          value={email} 
          onChange={(event) => setEmail(event.target.value)} />
          <br />
          <TextField 
          required 
          id="standard-required" 
          label="Username" 
          defaultValue="None" 
          value={username} 
          onChange={(event) => setUsername(event.target.value)} />
          <br />
          <TextField 
          required 
          id="standard" 
          label="Address" 
          defaultValue="None" 
          value={address}
          onChange={(event) => setAddress(event.target.value)} />
          <br />
      <Button className={classes.button} variant="contained" color="primary" onClick={(event) => updateUser(event)}>Save</Button>
      <Button className={classes.button} variant="contained" color="secondary" onClick={(event) => deleteUser(event)}>Delete</Button>
      <Button className={classes.button} variant="contained" color="secondary" href={`/home`}>Cancel</Button>
          <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">Error</DialogTitle>
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
      </div>
      </form>
      );
}

export default UserEdit;