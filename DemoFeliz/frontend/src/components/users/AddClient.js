import React,{Component} from 'react';

import ClientService from '../../services/ClientService';

class AddClient extends Component{

	constructor(props){
		super(props);
		this.onChangeModel_primary = this.onChangeModel_primary.bind(this);
		this.onChangemodel_secundary = this.onChangemodel_secundary.bind(this);
		this.onChangeSave_meta = this.onChangeSave_meta.bind(this);
		this.onChangeCamara_id = this.onChangeCamara_id.bind(this);
		this.saveClient = this.saveClient.bind(this);

		this.state = {
			id: null,
			model_primary: "",
			model_secundary: "",
			save_meta: "",
			camara_id: "",
			submitted: false
		};

	}

	onChangeModel_primary(e){
		this.setState({
			model_primary: e.target.value
		});
	}

	onChangemodel_secundary(e){
		this.setState({
			model_secundary: e.target.value
		});
	}

	onChangeSave_meta(e){
		this.setState({
			save_meta: e.target.value
		});
	}

	onChangeCamara_id(e){
		this.setState({
			camara_id: e.target.value
		});
	}

	saveClient(){
		var data = {
			model_primary: this.state.model_primary,
			model_secundary: this.state.model_secundary,
			save_meta: this.state.save_meta,
			camara_id: this.state.camara_id,
		};

		ClientService.addNewClient(data)
			.then(response => {
			this.setState({
				id: response.data.id,
				model_primary: response.data.model_primary,
				model_secundary: response.data.model_secundary,
				save_meta: response.data.save_meta,
				camara_id: parseInt(response.data.camara_id,10),
				submitted: true
			});
		})
		.catch(e => {
        console.log(e);
      });
	}

	render() {
    	return (
    		<div className="container">
    		<div className="w-75 mx-auto shadow p-5">
    		<h2 className="text-center mb-4">Agregar tarea de cliente</h2>
      		<div className="submit-form">
        		{this.state.submitted ? (
          			<div>
            			<h4>La tarea fue registrada</h4>
          			</div>
        		) : (
          			<div>
            			<div className="form-group">
              				<label htmlFor="name">Modelo primario</label>
              				<input type="text" className="form-control" id="name" required value={this.state.model_primary} onChange={this.onChangeModel_primary}
                			name="name"/>
            			</div>
            			<div className="form-group">
              				<label htmlFor="username">Modelo Secundario</label>
              				<input type="text" className="form-control" id="username" required value={this.state.model_secundary} onChange={this.onChangemodel_secundary}
                			name="username"/>
            			</div>
            			<div className="form-group">
              				<label htmlFor="email">¿Guardar metadata?</label>
              				<input type="email" className="form-control" id="email" required value={this.state.save_meta} onChange={this.onChangeSave_meta}
                			name="email"/>
            			</div>
            			<div className="form-group">
              				<label htmlFor="phone">Camara id</label>
              				<input type="text" className="form-control" id="phone" required value={this.state.camara_id} onChange={this.onChangeCamara_id}
                			name="phone"/>
            			</div>
            			<button onClick={this.saveClient} className="btn btn-success btn-block">Guardar</button>
          			</div>
        		)}
      		</div>
      		</div>
      		</div>
   		);
  	}
}
export default AddClient;