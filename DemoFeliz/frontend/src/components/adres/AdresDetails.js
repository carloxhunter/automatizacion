import React,{Component} from 'react';

import AdresService from '../../services/AdresService';

import { Link } from 'react-router-dom';

class AdresDetails extends Component{

	constructor(props){
		super(props);
		this.loadAdres = this.loadAdres.bind(this);
		this.deleteAdres = this.deleteAdres.bind(this);

		this.state = {
			currentAdres: {
				id: null,
				street: "",
				suite: "",
				city: "",
				zipcode: ""
			}
		}
	}

	componentDidMount() {
    	this.loadAdres(this.props.match.params.id);
  	}

	loadAdres(id){
		AdresService.getAddressById(id)
		.then(response => {
			this.setState({
				currentAdres: response.data
			});
		})
		.catch(e => {
        console.log(e);
      });
	}

	deleteAdres(){
		AdresService.deleteAddress(this.state.currentAdres.id)
		.then(response => {
			this.props.history.push('/address')
		})
		.catch(e => {
        	console.log(e);
      	});
	}

	render(){
		const { currentAdres } = this.state;
		return(
			<div className="container">
				<div className="py-4">
					<h1 className="text-center">Address Details</h1>
				</div>
				<div className="row">
					<div className="col-md">
						<Link className="btn btn-dark btn-block" to="/address">Back to Address</Link>
					</div>
					<div className="col-md">
						<button className="btn btn-danger btn-block" onClick={this.deleteAdres}>Delete Address</button>
					</div>
				</div>
				<div className="row">
					<div className="col-md">
						<ul className="list-group w-60 py-4">
							<li className="list-group-item">Street: {currentAdres.street}</li>
							<li className="list-group-item">Suite: {currentAdres.suite}</li>
							<li className="list-group-item">City: {currentAdres.city}</li>
							<li className="list-group-item">Zipcode: {currentAdres.zipcode}</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}
export default AdresDetails;