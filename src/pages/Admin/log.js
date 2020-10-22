// Admin can see registered logs logs here after they logged in
import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  TextField
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
import Box from '@material-ui/core/Box';
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
  const [logs, setLogs] = useState([]) // set all registered logs logs
  const [message, setMessage] = useState('') // error message
  const [open, setOpen] = useState(false) // open prompt
  const [searchText, setSearchText] = useState(null); // what user search
  const [searchedLogs, setSearchedLogs] = useState([]); // all logs based on user's search
  

  // fetch all logs as an Admin
  useEffect(() => {
    axios
    .get(`http://localhost:3001/admin/logs`)
    .then(response => {
      console.log('All logs are successfully fetched!')
      // date format
      response.data.map(log => {
        log.date = new Date(log.date).toString().substring(0,24)
      })
      // sort logs
      let sortedLogs = response.data.sort((obj1, obj2) => obj1["date"] > obj2["date"] ? -1 : 1)
      setLogs(sortedLogs)
      setSearchedLogs(sortedLogs)
    })
    .catch(error => {
      setMessage('Logs failed to be fetched. Please try again.');
      setOpen(true)
    })
  }, [])


  // search log
  const searchLog = () => {
    let searchedLog = [];

    // if search bar is not empty
    if (searchText){
      const searchTextLowerCase = (searchText || "").toLowerCase();
    
      logs.map((log,i)=>{
        if ( log.date && log.date.toLowerCase().includes(searchTextLowerCase)){
          console.log(log.date)
          searchedLog.push(log);
        }
      });

      // if there is no logs found
      if (searchedLog.length < 1){
        setMessage("There is no log found in the record.")
        setOpen(true)
      } else { // if there is display all searched ones
        setSearchedLogs(searchedLog);
        setSearchText(searchText)
      }
    } else {  // if search bar not empty set all logs as the searched ones
      setSearchedLogs(logs);
    }
  };


    const classes = useStyles();  

        return (
        <div>
        {/* Searchbar */}
        <h1 className={classes.heading}>Find Logs</h1>
        <div className="Search">

          <TextField
            required
            style={{ margin: 8 }}
            id="outlined-helperText"
            label="Log Date"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            onChange={(event) => { setSearchText(event.target.value) }}
            value={searchText}
          />&nbsp;&nbsp;&nbsp;

          <div className="Button">
            <Button  style={{
              background: '/',  
              color: "/",
              textAlign: 'right',  
              margin: " auto"}}
              variant="contained"
              color="primary"
              onClick={() => { searchLog() }}>Search</Button>
          </div>
        </div>
          {/* List */}
          {
            searchedLogs.map(log => (
            <ListItem>
              <ListItemText
                 primary={log.user ? log.user.username : "Unknown account"}
                 secondary={
                  <React.Fragment>
                <br />
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">
                  <b>Email:</b> {log.user ? log.user.email : "Unknown account"}
                </Typography>
                <br />
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">
                  <b>Date:</b> {log.date}
                </Typography>
                <br />
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">
                  <b>Status:</b> {log.status == 1 ? 
                  <Box color="green" clone>
                    <Typography>Success</Typography>
                  </Box>
                  : 
                  <Box color="red" clone>
                    <Typography>Failed</Typography>
                  </Box>
                  }
                </Typography>
              </React.Fragment>}/>
                {/* <Button className={classes.button} variant="contained" color="primary" href={`/admin/user/edit/${user.id}`}>Edit</Button> */}
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