import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Typography,
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
import axios from 'axios';
import { selectFields } from 'express-validator/src/select-fields';

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

const Wishlist = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('') // error message
    const [open, setOpen] = useState(false) // open prompt
    const [user, setUser] = useState({}); // current logged in user
    const [wishlist, setWishlist] = useState([]) // set all wishlist item

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

            axios
            .get(`http://localhost:3001/wishlist/view/${user.id}`)
            .then(response => {
              console.log('Wishlist Loaded')
              console.log(response.data)
              setWishlist(response.data)
            })
            .catch(error => {
              setMessage('Wishlist Failed, Please Try Again');
              setOpen(true)
            })
          })     
      }

  }, [])


  const deleteProperty = (event, property_id) => {
    event.preventDefault();
    
    axios
    .delete(`http://localhost:3001/wishlist/delete/${user.id}-${property_id}`)
    .then(response => {
      console.log('Property is deleted successfully')
      window.location = '/user/wishlist'
    })
    .catch(error => {
      setMessage('Property failed to be deleted. Please try again.');
      setOpen(true)    
    })
  }
  const deleteWishlist = (event, user) => {
    event.preventDefault();

    axios
    .delete(`http://localhost:3001/wishlist/clear/${user.id}`)
    .then(response => {
      console.log('wishlist is deleted successfully')
      window.location = '/user/wishlist'
    })
    .catch(error => {
      setMessage('Wishlist failed to be deleted. Please try again.');
      setOpen(true)    
    })
  }

  const classes = useStyles();

return (
  <div>
    <h1>{firstName}'s Wishlist</h1>
    <Button className={classes.button} variant="contained" color="secondary" onClick={(event) => deleteWishlist(event, user)}>Delete all</Button>
    <Grid container direction="row">
    { wishlist.map(wishlist => { 
        return(
            <Card className={classes.root}>
            <CardActionArea>
              <CardContent className={classes.card}>
                  <CardMedia
                  component="img"
                  alt="Property"
                  height="200"
                  image={wishlist.property_id.url}
                  title="Property"
                />
                <Typography gutterBottom variant="h5" component="h2">
                {wishlist.property_id.name}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                 {wishlist.property_id.description}
                <Typography variant="body2" color="textSecondary" component="p">
                Located in: {wishlist.property_id.address}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                Coordinate: {wishlist.property_id.coordinate}
                </Typography>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
               Price: $ {wishlist.property_id.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
               Size(Sqm): {wishlist.property_id.size}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
               Property Type: {wishlist.property_id.type}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Button className={classes.button} variant="contained" color="secondary" onClick={(event) => deleteProperty(event, wishlist.property_id.id)}>Delete</Button>
          </Card>
      ) 
    }) 
  }
  </Grid>
  </div>
);
}


export default Wishlist;