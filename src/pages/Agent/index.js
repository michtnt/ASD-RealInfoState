// User can find agents
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
import mockAgents from "../../data/mockAgents";

const useStyles = makeStyles({
  root: {
    maxWidth: 280,
    margin: 10
  },
  heading: {
    marginLeft: 10
  },
  card: {
    height: 250
  }
});

const Agent = () => {

const classes = useStyles();

return(
  <div id='agents'>
    <Typography variant='h4' 
      style={{
      background: '/',
      color: '/',
      textAlign: 'center',  
      margin: "10px auto"}}>
      Agents
      </Typography> 
      <br></br>
      <h1 className={classes.heading}></h1>
      <Grid container direction="row">
      {mockAgents.map(agents => { 
        return(
          <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Agent"
              height="200"
              image={require(`../../images/${agents.image}.jpg`)}
              title="Agent"
            />
              <CardContent className={classes.card}>
                <Typography gutterBottom variant="h5" component="h2">
                  {agents.name}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                Phone: {agents.number}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                Email: {agents.email}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Call
              </Button>
              <Button size="small" color="primary">
                Email
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

export default Agent;