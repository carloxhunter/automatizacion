import React,{Component} from 'react';

import UserService from '../../services/UserService';

class AddUser extends Component{

	constructor(props){
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePhone = this.onChangePhone.bind(this);
		this.onChangeWebside = this.onChangeWebside.bind(this);
		this.saveUser = this.saveUser.bind(this);
		this.newUser = this.newUser.bind(this);

		this.state = {
			id: null,
			name: "",
			username: "",
			email: "",
			phone: "",
			webside: "",
			submitted: false
		};

	}


	onChangeName(e){
		this.setState({
			name: e.target.value
		});
	}

	onChangeUsername(e){
		this.setState({
			username: e.target.value
		});
	}

	onChangeEmail(e){
		this.setState({
			email: e.target.value
		});
	}

	onChangePhone(e){
		this.setState({
			phone: e.target.value
		});
	}

	onChangeWebside(e){
		this.setState({
			webside: e.target.value
		});
	}

	saveUser(){
		var data = {
			name: this.state.name,
			username: this.state.username,
			email: this.state.email,
			phone: this.state.phone,
			webside: this.state.webside
		};

		UserService.addNewUser(data)
			.then(response => {
			this.setState({
				id: response.data.id,
				name: response.data.name,
				username: response.data.username,
				email: response.data.email,
				phone: response.data.phone,
				webside: response.data.webside,
				submitted: true
			});
		})
		.catch(e => {
        console.log(e);
      });
	}

	newUser(){
		this.setState({
			id: null,
			name: "",
			username: "",
			email: "",
			phone: "",
			webside: "",
			submitted: false
		});
	}

	render() {
    	return (
    		<div className="container">
    		<div className="w-75 mx-auto shadow p-5">
    		<h2 className="text-center mb-4">Add User</h2>
      		<div className="submit-form">
        		{this.state.submitted ? (
          			<div>
            			<h4>You submitted successfully!</h4>
            			<button className="btn btn-success" onClick={this.newUser}>Add</button>
          			</div>
        		) : (
          			<div>
            			<div className="form-group">
              				<label htmlFor="name">Name</label>
              				<input type="text" className="form-control" id="name" required value={this.state.name} onChange={this.onChangeName}
                			name="name"/>
            			</div>
            			<div className="form-group">
              				<label htmlFor="username">Username</label>
              				<input type="text" className="form-control" id="username" required value={this.state.username} onChange={this.onChangeUsername}
                			name="username"/>
            			</div>
            			<div className="form-group">
              				<label htmlFor="email">Email</label>
              				<input type="email" className="form-control" id="email" required value={this.state.email} onChange={this.onChangeEmail}
                			name="email"/>
            			</div>
            			<div className="form-group">
              				<label htmlFor="phone">Phone</label>
              				<input type="text" className="form-control" id="phone" required value={this.state.phone} onChange={this.onChangePhone}
                			name="phone"/>
            			</div>
            			<div className="form-group">
            				<label htmlFor="webside">Webside</label>
            				<input type="text" className="form-control" id="webside" required value={this.state.webside} onChange={this.onChangeWebside}
                			name="webside"/>
            			</div>
            			<button onClick={this.saveUser} className="btn btn-success btn-block">Submit</button>
          			</div>
        		)}
      		</div>
      		</div>
      		</div>
   		);
  	}
}
export default AddUser;