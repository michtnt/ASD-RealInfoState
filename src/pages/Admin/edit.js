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

const Edit = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('') // error message
  const [open, setOpen] = useState(false) // open prompt

  // edit specific user as an admin
  useEffect(() => {
    axios
    .get(`http://localhost:3001/admin/users/${props.match.params.id}`)
    .then(response => {
      console.log('User are fetched successfully!')
      console.log(response.data)
      setFirstName(response.data[0].firstName)
      setLastName(response.data[0].lastName)
      setEmail(response.data[0].email)
      setUsername(response.data[0].username)
      setAddress(response.data[0].address)
    })
  }, [])

  // update specific user as an admin
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
    .put(`http://localhost:3001/admin/users/${props.match.params.id}`, { user: updateUser } )
    .then(response => {
      console.log('User are updated successsfully')
      window.location='/admin/home'
    })
    .catch(error => {
      setMessage('Users failed to be updated. Please try again.');
      setOpen(true)
    })
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
      <Button className={classes.button} variant="contained" color="secondary" href={`/admin/home`}>Cancel</Button>
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

export default Edit;