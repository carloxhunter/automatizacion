import React,{Component} from 'react';

import CompanyService from '../../services/CompanyService';

class EditCompany extends Component{

  constructor(props){
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.loadCompany = this.loadCompany.bind(this);
    this.updateCompany = this.updateCompany.bind(this);

    this.state = {
      currentCompany: {
        id: null,
        name: ""
      }
    };
  }

  componentDidMount(){
    this.loadCompany(this.props.match.params.id);
  }

  onChangeName(e){
    const name = e.target.value

    this.setState(function(prevState){
      return{
        currentCompany: {
          ...prevState.currentCompany,
          name: name
        }
      };
    })
  }

  loadCompany(id){
    CompanyService.getCompanyById(id)
    .then(response => {
      this.setState({
        currentCompany: response.data
      })
    })
    .catch(e => {
        console.log(e);
      });
  }

  updateCompany(){
    CompanyService.updateCompany(this.state.currentCompany.id,this.state.currentCompany)
    .then(response =>{
      console.log(response.data);
      this.setState({
          message: "The company was updated successfully!"
        });
      this.props.history.push('/company')
    })
    .catch(e => {
        console.log(e);
      });
  }

	render(){
    const {currentCompany} = this.state;
		return(
			<div className="container">
				<div className="w-75 mx-auto shadow p-5">
        			<h1 className="text-center py-4">Edit Company</h1>
        			<div className="form-submit">
        				<div className="form-group">
              				<label htmlFor="name">Name</label>
              				<input type="text" className="form-control" id="name" required name="name" value={currentCompany.name} onChange={this.onChangeName}/>
            			</div>
            			<button className="btn btn-block btn-warning" onClick={this.updateCompany}>Update User</button>
        			</div>
        		</div>
      		</div>
    	)
  	}
}

export default EditCompany

