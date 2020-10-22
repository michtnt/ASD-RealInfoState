// User can check on news
// extra functions
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

import mockNews from "../../data/mockNews";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: 10
  },
  heading: {
    marginLeft: 10
  },
  card: {
    height: 300
  }
});

const News = () => {

const classes = useStyles();

return(
  <div id='home'>
    <Typography variant='h4' 
      style={{
      background: '/',
      color: '/',
      textAlign: 'center',  
      margin: "10px auto"}}>
      News
      </Typography> 
      <br></br>
      <h1 className={classes.heading}>News</h1>
      <Grid container direction="row">
      { mockNews.map(news => { 
        return(
            <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Real Estate"
                height="140"
                image={require(`../../images/${news.image}.jpeg`)}
                title="Real Estate"
              />
              <CardContent className={classes.card}>
                <Typography gutterBottom variant="h5" component="h2">
                  {news.title}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                By {news.author}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {news.heading}
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
            </CardActions>
          </Card>
          ) 
        })
        }
    </Grid>
    </div>
       )
    }

export default News;