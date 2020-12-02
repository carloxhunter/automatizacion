import React,{Component} from 'react';

import ClientService from '../../services/ClientService';
import {ReactFlvPlayer} from 'react-flv-player'

import { Link } from 'react-router-dom';
import StateManager from 'react-select';
var urljon=""

class ClientDetails extends Component{

	constructor(props){
		super(props);
		this.loadClient = this.loadClient.bind(this);
		this.deleteClient = this.deleteClient.bind(this);
		this.sendTask = this.sendTask.bind(this);
		this.updateClient = this.updateClient.bind(this);
		this.stopDocker = this.stopDocker.bind(this);
		this.gethttp=this.gethttp.bind(this);


		this.state = {
			currentTask: {
				id: null,
				modelo_primario: "",
				modelo_secundario: "",
				estado : false,
				url:"",
				salida:"",
				http:""
				
			}
		}
	}

	componentDidMount() {
    	this.loadClient(this.props.match.params.id);
	  }
	  
	  gethttp(){
		  return this.state.http
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
			"token": this.state.currentTask.id,
			"name":"testName"
		  }
		ClientService.upDeepstream(data).then(response => {
			console.log("Respuesta de server " + response.data.rtsp+" "+response.data.http)
			this.state.currentTask.salida=response.data.rtsp
			this.state.currentTask.http=response.data.http
			console.log(this.state.currentTask.salida, this.state.currentTask.http)
			ClientService.updateClient(this.state.currentTask.id,this.state.currentTask)
			.then(response =>{
				console.log(response.data);})
				.catch(e => {
					console.log(e);
				  });	
		})
		
		
		
		.catch(e => {
			console.log(e);
		});
		this.setState(function(prevState){
			return{
			  currentTask: {
				...prevState.currentTask,
				estado: true
			  }
			};
		  }, () =>{
			this.updateClient();
		  })
		 
	}


	stopDocker = () => {
		const data = {
			id: this.state.currentTask.id
			}
		ClientService.finishIdDocker(data).then(response => {
		}).catch(e => {
			console.log(e);
		});
		this.setState(function(prevState){
			return{
				currentTask: {
				...prevState.currentTask,
				estado: false,
				salida: "",
				http:""
				}
			};
			}, () =>{
			this.updateClient();
			})
		}


	render(){
		const { currentTask } = this.state;
		var urljiro = currentTask.http 
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
						<button className="btn btn-warning btn-block" onClick={this.deleteClient}>Eliminar tarea</button>
					</div>
					{currentTask.estado === false ?(
					<div className="col-md">
						<button className="btn btn-success btn-block" onClick={this.sendTask}>Enviar a procesar</button>
					</div>):(<div className="col-md">
						<button className="btn btn-danger btn-block" onClick={this.stopDocker}>Detener procesamiento</button>
					</div>)}
				</div>
				<div className="row">
					<div className="col-md">
						<ul className="list-group w-60 py-4">
							<li className="list-group-item">id: {currentTask.id}</li>
							<li className="list-group-item">modelo_primario: {currentTask.modelo_primario}</li>
							<li className="list-group-item">modelo_secundario: {JSON.stringify(currentTask.modelo_secundario)}</li>
							<li className="list-group-item">RTSP: {JSON.stringify(currentTask.url)}</li>
							<li className="list-group-item">RTSP SALIDA: {currentTask.salida}</li>
							<li className="list-group-item">HTTP SALIDA: {currentTask.http}</li>
						</ul>
					</div>
				</div>
				{currentTask.estado === false ? (
						<div id='jiro'> test </div> ):


				<div id='div3'>
					
					{urljiro}
					<ReactFlvPlayer
						  //url = "http://3.131.221.80:8595/dps/clienteX.flv"
						url={urljiro}
          				heigh = "800px"
						  width = "800px"
						  type='flv'
						  isMuted={true}
						  isLive={true}
						  hasAudio={false}
						  stashInitialSize={500}
						  isMuted
						  enableWarning={false}
						  enableError={false}
						  handleError={(err) => {
						  switch (err) {
							case 'NetworkError':
							  // todo
							  console.log('network error');
							break;
							case 'MediaError':
							  console.log('network error');
							break;
							default:
							  console.log('other error');
						  }
						}}


					/>
     

				</div> }
			</div>
		)
	}
}
export default ClientDetails;
//url2=http://3.131.221.80:8595/dps/clienteX.flv