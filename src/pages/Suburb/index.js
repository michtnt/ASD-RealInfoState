// User can find suburbs
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {
  Typography,
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Button,
  Grid,
  Dialog,
  ListItem,
  ListItemText,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';


const useStyles = makeStyles({
  inline: {
    display: 'inline',
  },
  card: {
    width: window.innerWidth,
  },
  root: {
    marginBottom: 20
  }
});


const Suburb = () => {
  const [suburbs, setSuburbs] = useState([]); // all suburbs
  const [message, setMessage] = useState(''); // feedback message
  const [open, setOpen] = useState(false); // feedback opener
  const [searchText, setSearchText] = useState(null); // what user search
  const [searchedSuburbs, setSearchedSuburbs] = useState([]); // all suburbs based on user's search

  // get all suburbs
  useEffect(() => {
    axios.get('http://localhost:3001/suburb/')
    .then(response => {
      // sort suburbs
      let sortedSuburbs = response.data.sort((obj1, obj2) => obj1["name"] < obj2["name"] ? -1 : 1)
      setSearchedSuburbs(sortedSuburbs)
      setSuburbs(sortedSuburbs)
    })
    .catch(error => {
      console.log(error);
      setMessage("Failed to get all suburbs. Please try again later.")
      setOpen(true)
    })
  }, [])

  // search suburb
  const searchSuburb = () => {
    let searchedSuburb = [];

    // if search bar is not empty
    if (searchText){
      const searchTextLowerCase = (searchText || "").toLowerCase();
    
      suburbs.map((suburb,i)=>{
        if ( suburb.name && suburb.name.toLowerCase().includes(searchTextLowerCase)){
          searchedSuburb.push(suburb);
        }
      });
      
      // if there is no suburbs found
      if (searchedSuburb.length < 1){
        setMessage("There is no suburb found in the record.")
        setOpen(true)
      } else { // if there is display all searched ones
        setSearchedSuburbs(searchedSuburb);
        setSearchText(searchText)
      }
    } else {  // if search bar not empty set all suburbs as the searched ones
      setSearchedSuburbs(suburbs)
    }
  };

  const classes = useStyles();  

  return (
    <div className="App">
      <Typography variant='h4'
        style={{
          background: '/',
          color: '/',
          textAlign: 'center',
          margin: "10px auto"
        }}>
        Find a Home
      </Typography>
      <header className="App-header">
        <h2>Find a Home</h2>
        <div className="Search">
          <TextField
            required
            style={{ margin: 8 }}
            id="outlined-helperText"
            label="Suburb Name"
            variant="outlined"
            InputLabelProps={{shrink: true}}
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
              onClick={() => {
                searchSuburb();
              }}>Search</Button>
          </div>
        </div>
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
      </header>
      <Grid container direction="row">
      { searchedSuburbs.map(suburb => { 
        return(
            <Card className={classes.root}>
            <CardActionArea>
              <CardContent className={classes.card}>
                  {/* <CardMedia
                  component="img"
                  alt="suburb"
                  height="200"
                  image={suburb.url}
                  title="suburb"
                /> */}
                <Typography gutterBottom variant="h5" component="h2">
                {suburb.name}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                 {suburb.description}
                 </Typography>
                 <br />
                <Typography variant="body2" color="textSecondary" component="p">
                <b>Average Property Cost:</b> $ {suburb.averagePropertyCost}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                <b>Transport Rate:</b> {suburb.transportRate}%
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                <b>Satisfaction Rate:</b> {suburb.satisfactionRate}%
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                <b>Parking Rate:</b> {suburb.parkingRate}%
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                <b>Crime Rate:</b> {suburb.crimeRate}%
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                <b>Atar:</b> {suburb.atarAverage}%
                </Typography>
                
              </CardContent>
            </CardActionArea>
            <CardActions>
        
            </CardActions>
          </Card>
      ) 
    }) 
  }
    </Grid>
    </div>
  );
}

export default Suburb;