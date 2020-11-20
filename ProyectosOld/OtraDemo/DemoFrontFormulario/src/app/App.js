import React, { Component, useState, useEffect } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            modelo_primario: '',
            modelo_secundario: '',
            guardar_meta: '',
            tasks: [],
            _id: ''

        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    addTask(e) {
        if (this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Task Updated' });
                    this.setState({ modelo_primario: '', modelo_secundario: '',guardar_meta: '', _id: '' });
                    this.fetchTasks();
                })

        } else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({ html: 'Task saved!!' })
                    this.setState({ modelo_primario: '', modelo_secundario: '', guardar_meta: '' });
                    this.fetchTasks();
                })
                .catch(err => console.log(err));
        }

        e.preventDefault();
    }

    /**
     * Apenas la aplicaciòn cargue
     */
    componentDidMount() {
        this.fetchTasks();
    }

    /**
     * Obtenemos las tareas y cambiamos el estado de mi app y luego lo mostramos
     */
    fetchTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {

                this.setState({ tasks: data });
                console.log(this.state.tasks);
            });
    }

    deleteTask(id) {
        if (confirm('Are you sure you want to delete it?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Task deleted :(' });
                    this.fetchTasks();
                });
        }
    }


    /**
     * Editar
     * @param {} id 
     */
    editTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    modelo_primario: data.modelo_primario,
                    modelo_secundario: data.modelo_secundario,
                    guardar_meta:data.guardar_meta,
                    _id: data._id
                })
            });
    }
    /**
     * Capturar los eventos
     */
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                {/*NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Test digevo app</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row"> 
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form  onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="modelo_primario" autoComplete="off" onChange={this.handleChange} type="text" placeholder="Titulo de tarea" value={this.state.modelo_primario}></input>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="modelo_secundario" autoComplete="off" onChange={this.handleChange} placeholder="Descripcion de titulo" className="materialize-textarea" value={this.state.modelo_secundario}></textarea>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="guardar_meta" autoComplete="off" onChange={this.handleChange} placeholder="Metadata" className="materialize-textarea" value={this.state.guardar_meta}></textarea>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn light-blue darken-4">Enviar</button>

                                    </form>
                                </div>

                            </div>
                        </div>

                        <div className="col s7">

                            <table>
                                <thead>
                                    <tr>
                                        <th>Primario</th>
                                        <th>Secundario</th>
                                        <th>Metadata</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.modelo_primario}</td>
                                                    <td>{task.modelo_secundario}</td>
                                                    <td>{task.guardar_meta}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => {
                                                            this.deleteTask(task._id)
                                                        }}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button onClick={() => this.editTask(task._id)} className="btn light-blue darken-4" style={{ margin: '4px' }}>
                                                            <i className="material-icons">edit</i>

                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;