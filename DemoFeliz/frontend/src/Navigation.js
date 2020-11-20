import React,{Component} from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component{
	render(){
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-purple">
				<div className="container">
					<Link className="navbar-brand" to="/">DIGEVO</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
						aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    						<span className="navbar-toggler-icon"></span>
  					</button>
  					<div id="navbarSupportedContent" className="collapse navbar-collapse">
  						<ul className="navbar-nav mr-auto">
  							<li className="nav-item">
  								<Link to="/client" className="nav-link">Lista de tareas</Link>
  							</li>
						</ul>
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link to="/addClient" className="nav-link">Añadir Tarea</Link>
							</li>
  						</ul>
  					</div>
				</div>
			</nav>
		)
	}
}
export default Navigation