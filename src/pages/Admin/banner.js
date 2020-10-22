import React, { useState } from 'react';
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

const Banner = (props) => {
  const [banner, setBanner] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false)

  const updateBanner = (event) => {
    event.preventDefault()
    window.localStorage.setItem('adminBanner', JSON.stringify(banner))
    // if(window.localStorage.getItem('adminBanner') == banner){
      setMessage('Banner changed successfully!')
      setOpen(true)  
      setTimeout(() => {
        window.location="/admin/home"
      },1000)
    // }
  }
  
  const classes = useStyles();  
  return (
      <form noValidate autoComplete="off">
        <div>
          <TextField 
          required 
          id="standard" 
          label="Website Banner" 
          defaultValue="None" 
          value={banner} 
          onChange={(event) => setBanner(event.target.value)}/>
          <br />
      <Button className={classes.button} variant="contained" color="primary" onClick={(event) => updateBanner(event)}>Save</Button>
      <Button className={classes.button} variant="contained" color="secondary" href={`/admin/home`}>Cancel</Button>
          <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">Great!</DialogTitle>
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

export default Banner;