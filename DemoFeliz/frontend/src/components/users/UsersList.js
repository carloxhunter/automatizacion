import React,{Component} from 'react';

import UserService from '../../services/UserService';
import { Link } from "react-router-dom";

class UsersList extends Component{

	constructor(props){
		super(props);
		this.loadUsers = this.loadUsers.bind(this);
		this.removeAllUsers = this.removeAllUsers.bind(this);
		this.refreshList = this.refreshList.bind(this);

		this.state = {
			users: [],
			currentUser: {
				id: null
			}
		}
	}

	componentDidMount() {
    	this.loadUsers();
  	}

	loadUsers(){
		UserService.getAllUsers()
		.then(response => {
			this.setState({
				users: response.data
			});
		})
		.catch(e => {
        console.log(e);
      });
	}

	refreshList(){
		this.loadUsers();
	}

	removeAllUsers(){
		UserService.deleteAllUsers()
		.then(response => {
			console.log(response.data);
			this.refreshList();
		})
		.catch(e => {
        	console.log(e);
      	});
	}

	
	render(){
		const { users } = this.state;
		return(
			<div className="container">
				<div className="py-4">
					<h1 className="text-center">User List</h1>
				</div>
				<div className="row">
					<div className="col-lg">
						<button className="btn btn-danger btn-block" data-toggle="modal" data-target="#deleteAllUsersModal">Delete All Users</button>
					</div>
				</div>
				<div className="modal fade" tabIndex="-1" aria-hidden="true" id="deleteAllUsersModal">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h2 className="modal-title">Delete All Users</h2>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
          							<span aria-hidden="true">&times;</span>
        						</button>
							</div>
							<div className="modal-body">
								<p>Are you sure delete all users?</p>
							</div>
							<div className="modal-footer">
								<button className="btn btn-danger" onClick={this.removeAllUsers} 
								data-dismiss="modal" aria-label="Close">Delete All Users</button>
								<button className="btn btn-primary" aria-label="Close" data-dismiss="modal">Cancel</button>
							</div>
						</div>
					</div>
				</div>
				<div className="py-4">
					<table className="table border shadow">
						<thead className="thead-dark">
							<tr>
								<th scope="col">#</th>
								<th scope="col">Username</th>
								<th scope="col">Email</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user,index) => (
								<tr key={user.id}>
									<th scope="row">{index + 1}</th>
									<td>{user.username}</td>
                					<td>{user.email}</td>
                					<td>
                						<Link className="btn btn-outline-primary mr-2" to={`/users/${user.id}`}>View</Link>
                						<Link className="btn btn-outline-warning mr-2" to={`/users/edit/${user.id}`}>Edit</Link>
                					</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}
export default UsersList;