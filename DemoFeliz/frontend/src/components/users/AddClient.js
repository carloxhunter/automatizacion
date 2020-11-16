import React,{Component} from 'react';
import Select from 'react-select'

import ClientService from '../../services/ClientService';


const optionsModelPrimary = [
	{ value: 'peoplenet', label: 'Detector personas' },
	{ value: 'trafficam', label: 'Detector automoviles y personas' },
];

const optionsModelSeconday = [
	{ value: 'color_auto', label: 'Clasificador de color automoviles' },
	{ value: 'tipo_auto', label: 'Clasificador de marca de vehiculos' }
];

const optionsMetadata = [
	{ value: true, label: 'Si' },
	{ value: false, label: 'No' },
];

const optionsCameraId = [
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
	{ value: 4, label: '4' },
	{ value: 5, label: '5' },
	{ value: 6, label: '6' },
	{ value: 7, label: '7' },
	{ value: 8, label: '8' },
	{ value: 9, label: '8' }
];


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
			estado: "No procesando",
			submitted: false
		};

	}

	onChangeModel_primary(e){
		this.setState({
			model_primary: e.value
		});
	}

	onChangemodel_secundary(e){
		this.setState({
			model_secundary: e.value
		});
	}

	onChangeSave_meta(e){
		this.setState({
			save_meta: e.value
		});
	}

	onChangeCamara_id(e){
		this.setState({
			camara_id: e.value
		});
	}

	saveClient(){
		var data = {
			model_primary: this.state.model_primary,
			estado : this.state.estado,
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
						<div className="form-group">  <Select options={optionsModelPrimary} onChange={this.onChangeModel_primary} placeholder="Elija modelo primario" name="primary" /></div>
						<div className="form-group">  <Select options={optionsModelSeconday} onChange={this.onChangemodel_secundary} placeholder="Elija modelo secundario" name="secundary"/></div>
						<div className="form-group">  <Select options={optionsMetadata} onChange={this.onChangeSave_meta} placeholder="¿Desea guardar metadata en la BD?"name="metada"/></div>
						<div className="form-group">  <Select options={optionsCameraId} onChange={this.onChangeCamara_id} placeholder="Seleccione camara ID"name="camaraid"/></div>
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