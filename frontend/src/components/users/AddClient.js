import React,{Component} from 'react';
import Select from 'react-select'

import ClientService from '../../services/ClientService';


const optionsModelPrimary = [
	{ value: 'peoplenet', label: 'Detector personas' },
	{ value: 'trafficcam', label: 'Detector automoviles y personas' },
];

const optionsModelSeconday = [
	{ value: 'color_auto', label: 'Clasificador de color automoviles' },
	{ value: 'tipo_auto', label: 'Clasificador de marca de vehiculos' }
];

const optionsMetadata = [
	{ value: true, label: 'Si' },
	{ value: false, label: 'No' },
];


class AddClient extends Component{

	constructor(props){
		super(props);
		this.onChangeModel_primary = this.onChangeModel_primary.bind(this);
		this.onChangemodel_secundary = this.onChangemodel_secundary.bind(this);
		this.onChangeSave_meta = this.onChangeSave_meta.bind(this);
		this.saveClient = this.saveClient.bind(this);

		this.state = {
			id: null,
			modelo_primario: "",
			modelo_secundario: [],
			guardar_metadata: "",
			estado: false,
			url: [],
			submitted: false
		};

	}

	onChangeModel_primary(e){
		this.setState({
			modelo_primario: e.value
		});
	}

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

	saveClient(){
		console.log(this.state);
		var data = {
			modelo_primario: this.state.modelo_primario,
			estado : this.state.estado,
			modelo_secundario: this.state.modelo_secundario,
			guardar_metadata: this.state.guardar_metadata,
			url: this.state.url
		};

		ClientService.addNewClient(data)
			.then(response => {
			this.setState({
				id: response.data.id,
				modelo_primario: response.data.modelo_primario,
				modelo_secundario: response.data.modelo_secundario,
				guardar_metadata: response.data.guardar_metadata,
				url: response.data.url,
				submitted: true
			});
		})
		.catch(e => {
        console.log(e);
      });
	}

	addUrl(){
		this.setState({url: [...this.state.url, ""]});
	}

	handleChange(e, index){
		this.state.url[index] = e.target.value; 
		this.setState({url: this.state.url})
	}

	handleRemove(index){ 
		this.state.url.splice(index,1); 
		console.log(this.state.url,"$$$$"); 
		this.setState({url: this.state.url})
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
							{
								this.state.url.map((url,index)=>{
									return(
										<form class="form-inline">

										<div key={index} class="text-center mb-4">
											<input placeholder={"RTSP "+index} className="form-control" onChange={(e)=>this.handleChange(e,index)} value={url}/>
										</div>
										<button onClick={(e)=>this.handleRemove(e)} className="btn btn-danger mb-4">Remove</button>
										</form>
									)
								})
							}
							<button onClick={(e)=>this.addUrl(e)}  className="btn btn-info">Agregar RTSP</button>
						</div>

            			<button onClick={this.saveClient} className="btn btn-primary btn-block">Guardar</button>
          			</div>
        		)}
      		</div>
      		</div>
      		</div>
   		);
  	}
}
export default AddClient;