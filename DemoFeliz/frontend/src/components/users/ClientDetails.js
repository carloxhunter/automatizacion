import React,{Component} from 'react';

import ClientService from '../../services/ClientService';

import { Link } from 'react-router-dom';

class ClientDetails extends Component{

	constructor(props){
		super(props);
		this.loadClient = this.loadClient.bind(this);
		this.deleteClient = this.deleteClient.bind(this);

		this.state = {
			currentTask: {
				id: null,
				model_primary: "",
				model_secundary: "",
				save_meta: "",
				camara_id: ""
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
				</div>
				<div className="row">
					<div className="col-md">
						<ul className="list-group w-60 py-4">
							<li className="list-group-item">model_primary: {currentTask.model_primary}</li>
							<li className="list-group-item">model_secundary: {currentTask.model_secundary}</li>
							<li className="list-group-item">save_meta: {currentTask.save_meta}</li>
							<li className="list-group-item">camara_id: {currentTask.camara_id}</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}
export default ClientDetails;