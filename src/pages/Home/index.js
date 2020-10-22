// Entry point to navigate to different functionalities of the website
import React from 'react';

import {
  Typography,
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Grid
} from '@material-ui/core';

import homeimages from "../../data/homeImages";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: 50
  },
  heading: {
    marginLeft: 10
  },
  card: {
    height: 200
  }
});

const Home = () => {

const classes = useStyles();

return(
  <div id='home'>
    <Typography variant='h4' 
      style={{
      background: '/',
      color: '/',
      textAlign: 'center',  
      margin: "10px auto"}}>
      Welcome to Real InfoState.
      </Typography> 
      <br></br>
      <Grid container direction="row">
      { homeimages.map(home => { 
        return(
            <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="home"
                height="250"
                image={require(`../../images/${home.image}.jpg`)}
                title="home"
              />
              <CardContent className={classes.card}>
                <Typography gutterBottom variant="h5" component="h2">
                  {home.name}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                 {home.type}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {home.owner}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={() => { window.location = home.url }} size="small" color="primary">
                Check Out
              </Button>
           
            </CardActions>
          </Card>
      ) 
    }) 
  }
    </Grid>
    </div>
       )
    }

export default Home;