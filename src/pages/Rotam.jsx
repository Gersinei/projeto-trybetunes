import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import Profile from './Profile';
import Favorites from './Favorites';
import Album from './Album';
import Search from './Search';
import Login from './Login';
import ProfileEdit from './ProfileEdit';

class Rotam extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/search" component={ Search } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default Rotam;
