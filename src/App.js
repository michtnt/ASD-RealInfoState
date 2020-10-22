// Entry File
import React, { Fragment } from 'react';
import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';
import { BrowserRouter as Router, Route} from "react-router-dom";

// Header
import AppHeader from './components/AppHeader';
import Info from './components/Info';
import Footer from './components/Footer';

// User
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Home from './pages/Home';
import Suburb from './pages/Suburb';
import Agent from './pages/Agent';
import News from './pages/News';
import Property from './pages/Property';
import UserEdit from './pages/User';

// Admin
import AdminLogin from './pages/Admin/login.js';
import AdminHome from './pages/Admin/home.js';
import AdminEdit from './pages/Admin/edit.js';
import AdminLog from './pages/Admin/log.js';
import AdminBanner from './pages/Admin/banner.js';

// Wishlist
import Wishlist from './pages/Wishlist';

const styles = theme => ({
  main: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
});

const App = ({ classes }) => (
  <Fragment>
    <CssBaseline />
    <AppHeader />
    <Info />
    <main className={classes.main}>
    <Router>
      <>
      {/* User */}
      <Route path="/" exact component={Home} />
      <Route path="/home" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/logout" exact component={Logout} />
      <Route path="/register" exact component={Register} />
      <Route path="/find/suburbs" exact component={Suburb} />
      <Route path="/news" exact component={News} />
      <Route path="/find/agents" exact component={Agent} />
      <Route path="/find/properties" exact component={Property} />
      <Route path="/user/edit" exact component={UserEdit}/>
      <Route path="/user/wishlist" exact component={Wishlist} />
      {/* Admin */}
      <Route path="/admin/login" exact component={AdminLogin} />
      <Route path="/admin/home" exact component={AdminHome} />
      <Route path="/admin/user/edit/:id" exact component={AdminEdit} />
      <Route path="/admin/logs" exact component={AdminLog} />
      <Route path="/admin/banner" exact component={AdminBanner} />
      </>
    </Router>
    </main>
    <Footer />
  </Fragment>
);

export default withStyles(styles)(App);