// Admin can see registered users here after they logged in an delete specific user
import React, { useState, useEffect } from 'react';
import {
  makeStyles
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from 'axios';

const useStyles = makeStyles({
  inline: {
    display: 'inline',
  },
  button: {
    margin: 10
  }
});

const Home = () => {
  const [value, setValue] = useState('') // R2: Searching users
  const [users, setUsers] = useState([]) // set all registered users
  const [message, setMessage] = useState('') // error message
  const [open, setOpen] = useState(false) // open prompt

  // fetch all users as an Admin
  useEffect(() => {
    axios
    .get(`http://localhost:3001/admin/users`)
    .then(response => {
      console.log('All users are successfully fetched!')
      console.log(response.data)
      setUsers(response.data)
    })
    .catch(error => {
      setMessage('Users failed to be fetched. Please try again.');
      setOpen(true)
    })
  }, [])

  // delete specific users as an Admin
  const deleteUser = (event, user) => {
    event.preventDefault();

    axios
    .delete(`http://localhost:3001/admin/users/${user.id}`)
    .then(response => {
      console.log('User is deleted successfully')
      window.location = '/admin/home'
    })
    .catch(error => {
      setMessage('Users failed to be deleted. Please try again.');
      setOpen(true)    
    })
  }

    const classes = useStyles();  

        return (
        <div>
          {/* Searchbar */}
          {/* List */}
          {
            users.map(user => (
            <ListItem>
              <ListItemText
                 primary={user.username}
                 secondary={
                  <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary">
                  <b>Name:</b> {user.firstName} {user.lastName ? user.lastName : ''}
                </Typography>
                <br />
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">
                  <b>Email:</b> {user.email}
                </Typography>
                <br />
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">
                  <b>Address:</b> {user.address ? user.address : "No Address found"}
                </Typography>
              </React.Fragment>}/>
                <Button className={classes.button} variant="contained" color="primary" href={`/admin/user/edit/${user.id}`}>Edit</Button>
                <Button className={classes.button} variant="contained" color="secondary" onClick={(event) => deleteUser(event, user)}>Delete</Button>
              </ListItem>
            ))
          }
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
        );
}

export default Home;