// User can search for properties
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
  root: {
    maxWidth: 400,
    margin: 10
  },
  heading: {
    marginLeft: 10
  },
  card: {
    height: 700
  },
  inline: {
    display: 'inline',
  }
});

const Property = () => {

  const [properties, setProperties] = useState([]); // all properties
  const [message, setMessage] = useState(''); // feedback message
  const [open, setOpen] = useState(false); // feedback opener
  const [searchText, setSearchText] = useState(null); // what user search
  const [searchedProperties, setSearchedProperties] = useState([]); // all properties based on user's search
  const [user, setUser] = useState({}); // current logged in user  
  
  
  // get all properties
  useEffect(() => {
    axios.get('http://localhost:3001/property/')
    .then(response => {
      // sort properties
      let sortedProperties = response.data.sort((obj1, obj2) => obj1["name"] < obj2["name"] ? -1 : 1)
      setSearchedProperties(sortedProperties)
      setProperties(sortedProperties)
    })
    .catch(error => {
      setMessage("Failed to get all properties. Please try again later.")
      setOpen(true)
    })

      const loggedUserJSON = window.localStorage.getItem('loggedInUser') //Get the current user
      if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON);
          setUser(user);
        }     
  }, [])

  // search property
  const searchProperty = () => {
    let searchedProperty = [];

    // if search bar is not empty
    if (searchText){
      const searchTextLowerCase = (searchText || "").toLowerCase();
    
      properties.map((property,i)=>{
        if ( property.address && property.address.toLowerCase().includes(searchTextLowerCase)){
          searchedProperty.push(property);
        }
      });

      // if there is no properties found
      if (searchedProperty.length < 1){
        setMessage("There is no property found in the record.")
        setOpen(true)
      } else { // if there is display all searched ones
        setSearchedProperties(searchedProperty);
        setSearchText(searchText)
      }
    } else {  // if search bar not empty set all properties as the searched ones
      setSearchedProperties(properties);
    }
  };

  //Add to wishlist
  const addToWishlist = (propertyId) => {

    axios
    .put(`http://localhost:3001/wishlist/add`, { user_id: user.id, property_id: propertyId } )
    .then(response => {
      console.log('Property Added to Your Wishlist')
    })
    .catch(error => {
      setMessage('Property Failed to be Added to wishlist. Please try again.');
      setOpen(true)
    })
    
  };

const classes = useStyles();

return(
  <div id='home'>
    <Typography variant='h4' 
      style={{
      background: '/',
      color: '/',
      textAlign: 'center',  
      margin: "10px auto"}}>
      New Property
      </Typography> 
      <br></br>
      <h1 className={classes.heading}>Find a Property</h1>
        <div className="Search">

          <TextField
            required
            style={{ margin: 8 }}
            id="outlined-helperText"
            label="Property Location"
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
              onClick={() => {
                searchProperty();
              }}
            >
              Search
                  </Button>
          </div>
        </div>
      <Grid container direction="row">
      { searchedProperties.map(property => { 
        return(
            <Card className={classes.root}>
            <CardActionArea>
              <CardContent className={classes.card}>
                  <CardMedia
                  component="img"
                  alt="Property"
                  height="200"
                  image={property.url}
                  title="Property"
                />
                <Typography gutterBottom variant="h5" component="h2">
                {property.name}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                 {property.description}
                <Typography variant="body2" color="textSecondary" component="p">
                Located in: {property.address}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                Coordinate: {property.coordinate}
                </Typography>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
               Price: $ {property.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
               Size(Sqm): {property.size}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
               Property Type: {property.type}
                </Typography>
                
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
              <Button size="small" color="primary"
              onClick={() => {
                addToWishlist(property.id);
              }}
              >
                Add to Wishlist
              </Button>
            </CardActions>
          </Card>
      ) 
    }) 
  }
    </Grid>
    <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
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
       )
    }

export default Property;