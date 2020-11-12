import React,{Component} from 'react';

import CompanyService from '../../services/CompanyService';

import { Link } from 'react-router-dom';

class CompanyDetails extends Component{

	constructor(props){
		super(props);
		this.loadCompany = this.loadCompany.bind(this);
		this.deleteCompany = this.deleteCompany.bind(this);

		this.state = {
			currentCompany: {
				id: null,
				name: ""
			}
		}
	}

	componentDidMount() {
    	this.loadCompany(this.props.match.params.id);
  	}

	loadCompany(id){
		CompanyService.getCompanyById(id)
		.then(response => {
			this.setState({
				currentCompany: response.data
			});
		})
		.catch(e => {
        console.log(e);
      });
	}

	deleteCompany(){
		CompanyService.deleteCompany(this.state.currentCompany.id)
		.then(response => {
			this.props.history.push('/company')
		})
		.catch(e => {
        	console.log(e);
      	});
	}

	render(){
		const { currentCompany } = this.state;
		return(
			<div className="container">
				<div className="py-4">
					<h1 className="text-center">Company Details</h1>
				</div>
				<div className="row">
					<div className="col-md">
						<Link className="btn btn-dark btn-block" to="/company">Back to Company</Link>
					</div>
					<div className="col-md">
						<button className="btn btn-danger btn-block" onClick={this.deleteCompany}>Delete Company</button>
					</div>
				</div>
				<div className="row">
					<div className="col-md">
						<ul className="list-group w-60 py-4">
							<li className="list-group-item">Name: {currentCompany.name}</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}
export default CompanyDetails;