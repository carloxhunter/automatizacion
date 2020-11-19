import React,{Component} from 'react';

import ClientService from '../../services/ClientService';

import { Link } from 'react-router-dom';

class ClientDetails extends Component{

	constructor(props){
		super(props);
		this.loadClient = this.loadClient.bind(this);
		this.deleteClient = this.deleteClient.bind(this);
		this.sendTask = this.sendTask.bind(this);
		this.updateClient = this.updateClient.bind(this);


		this.state = {
			currentTask: {
				id: null,
				modelo_primario: "",
				modelo_secundario: "",
				guardar_metadata: false,
				estado : "",
				url:""
				
			}
		}
	}

	componentDidMount() {
    	this.loadClient(this.props.match.params.id);
  	}

	loadClient(id){
		ClientService.getClientById(id)
		.then(response => {
			this.setState({
				currentTask: response.data
			});
		})
		.catch(e => {
        console.log(e);
      });
	}

	deleteClient(){
		ClientService.deleteClient(this.state.currentTask.id)
		.then(response => {
			this.props.history.push('/client')
		})
		.catch(e => {
        	console.log(e);
      	});
	}

	updateClient(){
		ClientService.updateClient(this.state.currentTask.id,this.state.currentTask)
		.then(response =>{
		  console.log(response.data);
		  this.setState({
			  message: "The cliente was updated successfully!"
			});
		  this.props.history.push('/client')
		})
		.catch(e => {
			console.log(e);
		  });
	  }

	sendTask = () => {
		const data = {
			"token": "abc12345",
			"version": "5.0",
			"puerto": "8550"
		  }
		ClientService.upDeepstream(data).then(response => {
		//ClientService.upDeepstream(this.state.currentTask.id).then(response => {
			console.log("Respuesta de server" + response.data)
		}).catch(e => {
			console.log(e);
		});
		this.setState(function(prevState){
			return{
			  currentTask: {
				...prevState.currentTask,
				estado: "Procesando"
			  }
			};
		  }, () =>{
			this.updateClient();
		  })
	}


	render(){
		const { currentTask } = this.state;
		return(
			<div className="container">
				<div className="py-4">
					<h1 className="text-center">Detalle de la tarea</h1>
				</div>
				<div className="row">
					<div className="col-md">
						<Link className="btn btn-dark btn-block" to="/client">Volver a lista de tareas</Link>
					</div>
					<div className="col-md">
						<button className="btn btn-danger btn-block" onClick={this.deleteClient}>Eliminar tarea</button>
					</div>
					{currentTask.estado === "No procesando" ?(
					<div className="col-md">
						<button className="btn btn-warning btn-block" onClick={this.sendTask}>Enviar a procesar</button>
					</div>):(<div className="col-md">
						<button className="btn btn-light btn-block">Procesando en estos momentos</button>
					</div>)}
				</div>
				<div className="row">
					<div className="col-md">
						<ul className="list-group w-60 py-4">
							<li className="list-group-item">id: {currentTask.id}</li>
							<li className="list-group-item">modelo_primario: {currentTask.modelo_primario}</li>
							<li className="list-group-item">modelo_secundario: {JSON.stringify(currentTask.modelo_secundario)}</li>
							<li className="list-group-item">guardar_metadata: {JSON.stringify(currentTask.guardar_metadata)}</li>
							<li className="list-group-item">RTSP: {JSON.stringify(currentTask.url)}</li>
						</ul>
					</div>
				</div>
				
			</div>
		)
	}
}
export default ClientDetails;