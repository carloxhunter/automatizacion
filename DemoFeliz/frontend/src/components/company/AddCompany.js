import React,{Component} from 'react';

import CompanyService from '../../services/CompanyService';

class AddCompany extends Component{

	constructor(props){
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.saveCompany = this.saveCompany.bind(this);
		this.newCompany = this.newCompany.bind(this);

		this.state = {
			id: null,
			name: "",
			submitted: false
		};

	}

	onChangeName(e){
		this.setState({
			name: e.target.value
		});
	}

	saveCompany(){
		var data = {
			name: this.state.name
		};

		CompanyService.addNewCompany(data)
			.then(response => {
			this.setState({
				id: response.data.id,
				name: response.data.name,
				submitted: true
			});
		})
		.catch(e => {
        console.log(e);
      });
	}

	newCompany(){
		this.setState({
			id: null,
			name: "",
			submitted: false
		});
	}

	render() {
    	return (
    		<div className="container">
    		<div className="w-75 mx-auto shadow p-5">
    		<h2 className="text-center mb-4">Add Company</h2>
      		<div className="submit-form">
        		{this.state.submitted ? (
          			<div>
            			<h4>You submitted successfully!</h4>
            			<button className="btn btn-success" onClick={this.newCompany}>Add</button>
          			</div>
        		) : (
          			<div>
            			<div className="form-group">
              				<label htmlFor="name">Name</label>
              				<input type="text" className="form-control" id="name" required value={this.state.name} onChange={this.onChangeName}
                			name="name"/>
            			</div>
            			<button onClick={this.saveCompany} className="btn btn-success btn-block">Submit</button>
          			</div>
        		)}
      		</div>
      		</div>
      		</div>
   		);
  	}
}
export default AddCompany;