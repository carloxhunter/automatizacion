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


//const jiro = [];

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
			modelo_primario: "",
			modelo_secundario: [],
			guardar_metadata: "",
			camara_id: '',
			estado: "No procesando",
			submitted: false
		};

	}

	onChangeModel_primary(e){
		this.setState({
			modelo_primario: e.value
		});
	}
/*
	onChangemodel_secundary(e){
		console.log(e);
		this.setState({
			modelo_secundario: e.value
		});
	}*/

	onChangemodel_secundary = (e) => {
		var tula = [];
		if (e)
			e.forEach(element => 
					tula.push(element.value));
		this.setState({
			modelo_secundario : tula
		});	
	}

	onChangeSave_meta(e){
		this.setState({
			guardar_metadata: e.value
		});
	}

	onChangeCamara_id(evt) {
		const financialGoal = (evt.target.validity.valid) ? evt.target.value : this.state.camara_id;
		this.setState({ camara_id : financialGoal });
	}

	saveClient(){
		var data = {
			modelo_primario: this.state.modelo_primario,
			estado : this.state.estado,
			modelo_secundario: this.state.modelo_secundario,
			guardar_metadata: this.state.guardar_metadata,
			camara_id: this.state.camara_id,
		};
		//console.log(data)

		ClientService.addNewClient(data)
			.then(response => {
			this.setState({
				id: response.data.id,
				modelo_primario: response.data.modelo_primario,
				modelo_secundario: response.data.modelo_secundario,
				guardar_metadata: response.data.guardar_metadata,
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
						<div className="form-group">  <Select options={optionsModelSeconday} isMulti onChange={this.onChangemodel_secundary} placeholder="Elija modelo secundario" name="secundary"/></div>
						<div className="form-group">  <Select options={optionsMetadata} onChange={this.onChangeSave_meta} placeholder="¿Desea guardar metadata en la BD?"name="metada"/></div>
						<div className="form-group"> 
							<label htmlFor="camara_id">Camara id: </label>
							<input type="text" pattern="[0-9]*" onInput={this.onChangeCamara_id.bind(this)} value={this.state.camara_id}/>   </div>
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