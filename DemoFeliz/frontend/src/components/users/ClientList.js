import React,{Component} from 'react';

import ClientService from '../../services/ClientService';
import { Link } from "react-router-dom";

class ClientList extends Component{

	constructor(props){
		super(props);
		this.loadTasks = this.loadTasks.bind(this);
		this.removeAllTasks = this.removeAllTasks.bind(this);
		this.refreshList = this.refreshList.bind(this);
		this.stopAllTasks = this.stopAllTasks.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			tasks: [],
			currentTask: {
				id: null
			},
			password:''
		}
	}

	componentDidMount() {
    	this.loadTasks();
  	}

	loadTasks(){
		ClientService.getAllClient()
		.then(response => {
			this.setState({
				tasks: response.data
			});
		})
		.catch(e => {
        console.log(e);
      });
	}

	refreshList(){
		this.loadTasks();
	}

	removeAllTasks(){
		console.log("oie")
		ClientService.deleteAllClient()
		.then(response => {
			console.log(response.data);
			this.refreshList();
		})
		.catch(e => {
        	console.log(e);
      	});
	}

	stopAllTasks(event){
		event.preventDefault();

		var data = {
			pw: this.state.password
		}
		ClientService.finishalldocker(data)
		.then(response => {
			console.log(response.data);
			this.refreshList();
		})
		.catch(e => {
        	console.log(e);
      	});
	}

	handleChange(event){
		this.setState({
			password : event.target.value
		})
	}
	
	render(){
		const { tasks } = this.state;
		return(
			<div className="container">
				<div className="py-4">
					<h1 className="text-center">Lista de tareas</h1>
				</div>
				<div className="row">
					<div className="col-lg">
						<button className="btn btn-danger btn-block" data-toggle="modal" data-target="#deleteAllUsersModal">Eliminar todas las tareas</button>
					</div>
					<div className="col-lg">
						<button className="btn btn-danger btn-block" data-toggle="modal" data-target="#stopAllDockerModal">Parar todos los procesamientos</button>
					</div>
				</div>
				<div className="modal fade" tabIndex="-1" aria-hidden="true" id="deleteAllUsersModal">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h2 className="modal-title">Eliminar todas las tareas</h2>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
          							<span aria-hidden="true">&times;</span>
        						</button>
							</div>
							<div className="modal-body">
								<p>¿Estas seguro?</p>
							</div>
							<div className="modal-footer">
								<button className="btn btn-danger" onClick={this.removeAllTasks} 
								data-dismiss="modal" aria-label="Close">Eliminar todas las tareas</button>
								<button className="btn btn-primary" aria-label="Close" data-dismiss="modal">Cancelar</button>
							</div>
						</div>
					</div>
				</div>
				<div className="modal fade" tabIndex="-1" aria-hidden="true" id="stopAllDockerModal">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h2 className="modal-title">Detener todos los procesamientos</h2>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
          							<span aria-hidden="true">&times;</span>
        						</button>
							</div>
							<div className="modal-body">
								<p>¿Estas seguro?</p>
								<input placeholder={"Contraseña"} className="form-control" onChange={this.handleChange} value={this.state.password}/>
							</div>
							<div className="modal-footer">
								<button className="btn btn-danger" onClick={this.stopAllTasks} 
								data-dismiss="modal" aria-label="Close">Detener</button>
								<button className="btn btn-primary" aria-label="Close" data-dismiss="modal">Cancelar</button>
							</div>
						</div>
					</div>
				</div>

				<div className="py-4">
					<table className="table border shadow">
						<thead className="thead-dark">
							<tr>
								<th scope="col">#</th>
								<th scope="col">Estado</th>
								<th scope="col">Id</th>
								<th scope="col">Modelo primario</th>
								<th scope="col">Modelo secundario</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{tasks.map((task,index) => (
								<tr key={task.id}>
									<th scope="row">{index + 1}</th>
									<td>{task.estado}</td>
									<td>{task.id}</td>
									<td>{task.modelo_primario}</td>
                					<td>{JSON.stringify(task.modelo_secundario)}</td>
                					<td>
                						<Link className="btn btn-outline-primary mr-2" to={`/client/${task.id}`}>Ver solicitud</Link>
                					</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}
export default ClientList;