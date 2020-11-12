import React,{Component} from 'react';

import UserService from '../../services/UserService';

import { Link } from 'react-router-dom';

class UserDetails extends Component{

	constructor(props){
		super(props);
		this.loadUser = this.loadUser.bind(this);
		this.deleteUser = this.deleteUser.bind(this);

		this.state = {
			currentUser: {
				id: null,
				name: "",
				username: "",
				email: "",
				phone: "",
				webside: ""
			}
		}
	}

	componentDidMount() {
    	this.loadUser(this.props.match.params.id);
  	}

	loadUser(id){
		UserService.getUserById(id)
		.then(response => {
			this.setState({
				currentUser: response.data
			});
		})
		.catch(e => {
        console.log(e);
      });
	}

	deleteUser(){
		UserService.deleteUser(this.state.currentUser.id)
		.then(response => {
			this.props.history.push('/users')
		})
		.catch(e => {
        	console.log(e);
      	});
	}

	render(){
		const { currentUser } = this.state;
		return(
			<div className="container">
				<div className="py-4">
					<h1 className="text-center">User Details</h1>
				</div>
				<div className="row">
					<div className="col-md">
						<Link className="btn btn-dark btn-block" to="/users">Back to Users</Link>
					</div>
					<div className="col-md">
						<button className="btn btn-danger btn-block" onClick={this.deleteUser}>Delete User</button>
					</div>
				</div>
				<div className="row">
					<div className="col-md">
						<ul className="list-group w-60 py-4">
							<li className="list-group-item">Name: {currentUser.name}</li>
							<li className="list-group-item">Username: {currentUser.username}</li>
							<li className="list-group-item">Email: {currentUser.email}</li>
							<li className="list-group-item">Phone: {currentUser.phone}</li>
							<li className="list-group-item">Webside: {currentUser.webside}</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}
export default UserDetails;