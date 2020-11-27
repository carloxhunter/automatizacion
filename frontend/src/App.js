import React from 'react';
import './App.css';
import Navigation from './Navigation';

import Home from './components/Home';

import ClientList from './components/users/ClientList';
import ClientDetails from './components/users/ClientDetails';
import AddClient from './components/users/AddClient';


import NotFoundPage from './components/NotFoundPage';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
  	<Router>
    	<div className="App">
      		<Navigation />

      		<Switch>
      			<Route exact path='/' component={Home} />

            <Route exact path='/client' component={ClientList} />
            <Route exact path='/client/:id' component={ClientDetails} />
            <Route exact path='/addClient' component={AddClient} />
            <Route component={NotFoundPage} />

      		</Switch>
   	 	</div>
   	</Router>
  );
}

export default App;
