import React,{Component} from 'react';

import UserService  from '../../services/UserService';

class EditUser extends Component{

  constructor(props){
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeWebside = this.onChangeWebside.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.loadUser = this.loadUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        name: "",
        username: "",
        email: "",
        phone: "",
        webside: ""
      }
    };
  }

  componentDidMount() {
    this.loadUser(this.props.match.params.id);
  }

  onChangeName(e){
    const name = e.target.value

    this.setState(function(prevState){
      return{
        currentUser: {
          ...prevState.currentUser,
          name: name
        }
      };
    })
  }

  onChangeUsername(e){
    const username = e.target.value

    this.setState(function(prevState){
      return{
        currentUser: {
          ...prevState.currentUser,
          username: username
        }
      };
    })
  }

  onChangeEmail(e){
    const email = e.target.value

    this.setState(function(prevState){
      return{
        currentUser: {
          ...prevState.currentUser,
          email: email
        }
      };
    })
  }

  onChangePhone(e){
    const phone = e.target.value

    this.setState(function(prevState){
      return{
        currentUser: {
          ...prevState.currentUser,
          phone: phone
        }
      };
    })
  }

  onChangeWebside(e){
    const webside = e.target.value

    this.setState(function(prevState){
      return{
        currentUser: {
          ...prevState.currentUser,
          webside: webside
        }
      };
    })
  }

  loadUser(id){
    UserService.getUserById(id)
    .then(response => {
      this.setState({
        currentUser: response.data
      })
    })
    .catch(e => {
        console.log(e);
      });
  }

  updateUser(){
    UserService.updateUser(this.state.currentUser.id,this.state.currentUser)
    .then(response =>{
      console.log(response.data);
      this.setState({
          message: "The user was updated successfully!"
        });
      this.props.history.push('/users')
    })
    .catch(e => {
        console.log(e);
      });
  }

	render(){
    const {currentUser} = this.state;
		return(
			<div className="container">
				<div className="w-75 mx-auto shadow p-5">
        			<h1 className="text-center py-4">Edit User</h1>
        			<div className="form-submit">
        				<div className="form-group">
              				<label htmlFor="name">Name</label>
              				<input type="text" className="form-control" id="name" required name="name" 
                        value={currentUser.name} onChange={this.onChangeName}/>
            			</div>
            			<div className="form-group">
              				<label htmlFor="username">Username</label>
              				<input type="text" className="form-control" id="username" required name="username" 
                        value={currentUser.username} onChange={this.onChangeUsername}/>
            			</div>
            			<div className="form-group">
              				<label htmlFor="email">Email</label>
              				<input type="email" className="form-control" id="email" required name="email"
                      value={currentUser.email} onChange={this.onChangeEmail}/>
            			</div>
            			<div className="form-group">
              				<label htmlFor="phone">Phone</label>
              				<input type="text" className="form-control" id="phone" required  name="phone"
                      value={currentUser.phone} onChange={this.onChangePhone}/>
            			</div>
            			<div className="form-group">
            				<label htmlFor="webside">Webside</label>
            				<input type="text" className="form-control" id="webside" required  name="webside"
                    value={currentUser.webside} onChange={this.onChangeWebside}/>
            			</div>
            			<button type="submit" className="btn btn-block btn-warning" onClick={this.updateUser}>Update User</button>
        			</div>
        		</div>
      		</div>
    	)
  	}
}

export default EditUser

