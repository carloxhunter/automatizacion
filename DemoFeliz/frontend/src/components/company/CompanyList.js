import React,{Component} from 'react';

import CompanyService from '../../services/CompanyService';
import { Link } from "react-router-dom";

class CompanyList extends Component{

	constructor(props){
		super(props);
		this.loadCompanies = this.loadCompanies.bind(this);
		this.removeAllCompanies = this.removeAllCompanies.bind(this);
		this.refreshList = this.refreshList.bind(this);

		this.state = {
			companies: []
		}
	}

	componentDidMount() {
    	this.loadCompanies();
  	}

	loadCompanies(){
		CompanyService.getAllCompany()
		.then(response => {
			this.setState({
				companies: response.data
			});
		})
		.catch(e => {
        console.log(e);
      });
	}

	refreshList(){
		this.loadCompanies();
	}

	removeAllCompanies(){
		CompanyService.deleteAllCompany()
		.then(response => {
			console.log(response.data);
			this.refreshList();
		})
		.catch(e => {
        	console.log(e);
      	});
	}


	render(){
		const { companies } = this.state;
		return(
			<div className="container">
				<div className="py-4">
					<h1 className="text-center">Company List</h1>
				</div>
				<div className="row">
					<div className="col-lg">
						<button className="btn btn-danger btn-block" data-toggle="modal" data-target="#deleteAllCompanyModal">Delete All Company</button>
					</div>
				</div>
				<div className="modal fade" tabIndex="-1" aria-hidden="true" id="deleteAllCompanyModal">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h2 className="modal-title">Delete All Company</h2>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
          							<span aria-hidden="true">&times;</span>
        						</button>
							</div>
							<div className="modal-body">
								<p>Are you sure delete all company?</p>
							</div>
							<div className="modal-footer">
								<button className="btn btn-danger" onClick={this.removeAllCompany} 
								data-dismiss="modal" aria-label="Close">Delete All Company</button>
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
								<th scope="col">Name</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{companies.map((company,index) => (
								<tr key={company.id}>
									<th scope="row">{index + 1}</th>
									<td>{company.name}</td>
                					<td>
                						<Link className="btn btn-outline-primary mr-2" to={`/company/${company.id}`}>View</Link>
                						<Link className="btn btn-outline-warning mr-2" to={`/company/edit/${company.id}`}>Edit</Link>
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
export default CompanyList;