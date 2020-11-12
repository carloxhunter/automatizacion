import React,{Component} from 'react';

import AdresService from '../../services/AdresService';

class EditAdres extends Component{

  constructor(props){
    super(props);
    this.onChangeStreet = this.onChangeStreet.bind(this);
    this.onChangeSuite = this.onChangeSuite.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeZipcode = this.onChangeZipcode.bind(this);
    this.updateAdres = this.updateAdres.bind(this);
    this.loadAdres = this.loadAdres.bind(this);

    this.state = {
      currentAdres: {
        id: null,
        street: "",
        suite: "",
        city: "",
        zipcode: ""
      }
    };
  }

  componentDidMount(){
    this.loadAdres(this.props.match.params.id);
  }

  onChangeStreet(e){
    const street = e.target.value

    this.setState(function(prevState){
      return{
        currentAdres: {
          ...prevState.currentAdres,
          street: street
        }
      };
    })
  }

  onChangeSuite(e){
    const suite = e.target.value

    this.setState(function(prevState){
      return{
        currentAdres: {
          ...prevState.currentAdres,
          suite: suite
        }
      };
    })
  }

  onChangeCity(e){
    const city = e.target.value

    this.setState(function(prevState){
      return{
        currentAdres: {
          ...prevState.currentAdres,
          city: city
        }
      };
    })
  }

  onChangeZipcode(e){
    const zipcode = e.target.value

    this.setState(function(prevState){
      return{
        currentAdres: {
          ...prevState.currentAdres,
          zipcode: zipcode
        }
      };
    })
  }

  loadAdres(id){
    AdresService.getAddressById(id)
    .then(response => {
      this.setState({
        currentAdres: response.data
      })
    })
    .catch(e => {
        console.log(e);
    });
  }

  updateAdres(){
    AdresService.updateAddress(this.state.currentAdres.id,this.state.currentAdres)
    .then(response =>{
      console.log(response.data);
      this.setState({
          message: "The adress was updated successfully!"
        });
      this.props.history.push('/address')
    })
    .catch(e => {
        console.log(e);
      });
  }

	render(){
    const {currentAdres} = this.state;
		return(
			<div className="container">
				<div className="w-75 mx-auto shadow p-5">
        			<h1 className="text-center py-4">Edit Address</h1>
        			<div className="form-submit">
        				<div className="form-group">
              				<label htmlFor="street">Street</label>
              				<input type="text" className="form-control" id="street" required name="street"
                      value={currentAdres.street} onChange={this.onChangeStreet}/>
            			</div>
            			<div className="form-group">
              				<label htmlFor="suite">Suite</label>
              				<input type="text" className="form-control" id="suite" required name="suite"
                      value={currentAdres.suite} onChange={this.onChangeSuite}/>
            			</div>
            			<div className="form-group">
              				<label htmlFor="city">City</label>
              				<input type="text" className="form-control" id="city" required name="city"
                      value={currentAdres.city} onChange={this.onChangeCity}/>
            			</div>
            			<div className="form-group">
              				<label htmlFor="zipcode">Zipcode</label>
              				<input type="text" className="form-control" id="zipcode" required name="zipcode"
                      value={currentAdres.zipcode} onChange={this.onChangeZipcode}/>
            			</div>
            			<button className="btn btn-block btn-warning" onClick={this.updateAdres}>Update Address</button>
        			</div>
        		</div>
      		</div>
    	)
  	}
}

export default EditAdres

