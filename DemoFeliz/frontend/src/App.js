import React from 'react';
import './App.css';
import Navigation from './Navigation';

import Home from './components/Home';

import UsersList from './components/users/UsersList';
import UserDetails from './components/users/UserDetails';
import AddUser from './components/users/AddUser';
import EditUser from './components/users/EditUser';

import AdresList from './components/adres/AdresList';
import AdresDetails from './components/adres/AdresDetails';
import AddAdres from './components/adres/AddAdres';
import EditAdres from './components/adres/EditAdres';


import CompanyList from './components/company/CompanyList';
import CompanyDetails from './components/company/CompanyDetails';
import AddCompany from './components/company/AddCompany';
import EditCompany from './components/company/EditCompany';


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

            <Route exact path='/users' component={UsersList} />
            <Route exact path='/users/:id' component={UserDetails} />
            <Route exact path='/addUser' component={AddUser} />
            <Route exact path='/users/edit/:id' component={EditUser} />

            <Route exact path='/address' component={AdresList} />
            <Route exact path='/address/:id' component={AdresDetails} />
            <Route exact path='/addAddress' component={AddAdres} />
            <Route exact path='/address/edit/:id' component={EditAdres} />

            <Route exact path='/company' component={CompanyList} />
            <Route exact path='/company/:id' component={CompanyDetails} />
            <Route exact path='/addCompany' component={AddCompany} />
            <Route exact path='/company/edit/:id' component={EditCompany} />
            
            <Route component={NotFoundPage} />

      		</Switch>
   	 	</div>
   	</Router>
  );
}

export default App;
