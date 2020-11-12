import React,{Component} from 'react';
import { Link } from "react-router-dom";

import AdresService from '../../services/AdresService';

class AdresList extends Component{

	constructor(props){
		super(props);
		this.loadAddress = this.loadAddress.bind(this);
		this.removeAllAddress = this.removeAllAddress.bind(this);
		this.refreshList = this.refreshList.bind(this);

		this.state = {
			address: []
		}
	}

	componentDidMount() {
    	this.loadAddress();
  	}

	loadAddress(){
		AdresService.getAllAddress()
		.then(response => {
			this.setState({
				address: response.data
			});
		})
		.catch(e => {
        console.log(e);
      });
	}

	refreshList(){
		this.loadAddress();
	}

	removeAllAddress(){
		AdresService.deleteAllAddress()
		.then(response => {
			console.log(response.data);
			this.refreshList();
		})
		.catch(e => {
        	console.log(e);
      	});
	}

	render(){
		const { address} = this.state;
		return(
			<div className="container">
				<div className="py-4">
					<h1>Address List</h1>
				</div>
				<div className="row">
					<div className="col-lg">
						<button className="btn btn-danger btn-block" data-toggle="modal" data-target="#deleteAllAddressModal">Delete All Address</button>
					</div>
				</div>
				<div className="modal fade" tabIndex="-1" aria-hidden="true" id="deleteAllAddressModal">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h2 className="modal-title">Delete All Address</h2>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
          							<span aria-hidden="true">&times;</span>
        						</button>
							</div>
							<div className="modal-body">
								<p>Are you sure delete all address?</p>
							</div>
							<div className="modal-footer">
								<button className="btn btn-danger" onClick={this.removeAllAddress} 
								data-dismiss="modal" aria-label="Close">Delete All Address</button>
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
								<th scope="col">Street</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{address.map((adres,index) => (
								<tr key={adres.id}>
									<th scope="row">{index + 1}</th>
									<td>{adres.street}</td>
                					<td>
                						<Link className="btn btn-outline-primary mr-2" to={`/address/${adres.id}`}>View</Link>
                						<Link className="btn btn-outline-warning mr-2" to={`/address/edit/${adres.id}`}>Edit</Link>
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
export default AdresList;