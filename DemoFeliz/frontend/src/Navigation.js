import React,{Component} from 'react';
import { Link } from 'react-router-dom';
class Navigation extends Component{
	render(){
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-purple">
				<div className="container">
					<Link className="navbar-brand" to="/">React Crud Application</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
						aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    						<span className="navbar-toggler-icon"></span>
  					</button>
  					<div id="navbarSupportedContent" className="collapse navbar-collapse">
  						<ul className="navbar-nav mr-auto">
  							<li className="nav-item">
  								<Link to="/users" className="nav-link">Users</Link>
  							</li>
                <li className="nav-item">
                  <Link to="/address" className="nav-link">Address</Link>
                </li>
                <li className="nav-item">
                  <Link to="/company" className="nav-link">Company</Link>
                </li>
  						</ul>
  						<ul className="navbar-nav ml-auto">
  							<li className="nav-item">
  								<Link to="/addUser" className="nav-link">Add User</Link>
  							</li>
                <li className="nav-item">
                  <Link to="/addAddress" className="nav-link">Add Address</Link>
                </li>
                <li className="nav-item">
                  <Link to="/addCompany" className="nav-link">Add Company</Link>
                </li>
  						</ul>
  					</div>
				</div>
			</nav>
		)
	}
}
export default Navigation