import React,{Component} from 'react';

import AdresService from '../../services/AdresService';

class AddAdres extends Component{

	constructor(props){
		super(props);
		this.onChangeStreet = this.onChangeStreet.bind(this);
		this.onChangeSuite = this.onChangeSuite.bind(this);
		this.onChangeCity = this.onChangeCity.bind(this);
		this.onChangeZipcode = this.onChangeZipcode.bind(this);
		this.saveAddress = this.saveAddress.bind(this);
		this.newAddress = this.newAddress.bind(this);

		this.state = {
			id: null,
			street: "",
			suite: "",
			city: "",
			zipcode: "",
			submitted: false
		};

	}


	onChangeStreet(e){
		this.setState({
			street: e.target.value
		});
	}

	onChangeSuite(e){
		this.setState({
			suite: e.target.value
		});
	}

	onChangeCity(e){
		this.setState({
			city: e.target.value
		});
	}

	onChangeZipcode(e){
		this.setState({
			zipcode: e.target.value
		});
	}

	saveAddress(){
		var data = {
			street: this.state.street,
			suite: this.state.suite,
			city: this.state.city,
			zipcode: this.state.zipcode
		};

		AdresService.addNewAddress(data)
			.then(response => {
			this.setState({
				id: response.data.id,
				street: response.data.street,
				suite: response.data.suite,
				city: response.data.city,
				zipcode: response.data.zipcode,
				submitted: true
			});
		})
		.catch(e => {
        console.log(e);
      });
	}

	newAddress(){
		this.setState({
			id: null,
			street: "",
			suite: "",
			city: "",
			zipcode: "",
			submitted: false
		});
	}

	render() {
    	return (
    		<div className="container">
    		<div className="w-75 mx-auto shadow p-5">
    		<h2 className="text-center mb-4">Add Address</h2>
      		<div className="submit-form">
        		{this.state.submitted ? (
          			<div>
            			<h4>You submitted successfully!</h4>
            			<button className="btn btn-success" onClick={this.newAddress}>Add</button>
          			</div>
        		) : (
          			<div>
            			<div className="form-group">
              				<label htmlFor="street">Street</label>
              				<input type="text" className="form-control" id="street" required value={this.state.street} onChange={this.onChangeStreet}
                			name="name"/>
            			</div>
            			<div className="form-group">
              				<label htmlFor="suite">Suite</label>
              				<input type="text" className="form-control" id="suite" required value={this.state.suite} onChange={this.onChangeSuite}
                			name="username"/>
            			</div>
            			<div className="form-group">
              				<label htmlFor="city">City</label>
              				<input type="city" className="form-control" id="city" required value={this.state.city} onChange={this.onChangeCity}
                			name="email"/>
            			</div>
            			<div className="form-group">
              				<label htmlFor="zipcode">Zipcode</label>
              				<input type="text" className="form-control" id="zipcode" required value={this.state.zipcode} onChange={this.onChangeZipcode}
                			name="phone"/>
            			</div>
            			<button onClick={this.saveAddress} className="btn btn-success btn-block">Submit</button>
          			</div>
        		)}
      		</div>
      		</div>
      		</div>
   		);
  	}
}
export default AddAdres;