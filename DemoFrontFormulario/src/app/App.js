import React, { Component, useState, useEffect } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
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
                    this.setState({ title: '', description: '', _id: '' });
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
                    this.setState({ title: '', description: '' });
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
                    title: data.title,
                    description: data.description,
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
                        <a className="brand-logo" href="/">MERN STACK</a>
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
                                                <input name="title" autoComplete="off" onChange={this.handleChange} type="text" placeholder="Task title" value={this.state.title}></input>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" autoComplete="off" onChange={this.handleChange} placeholder="Task description" className="materialize-textarea" value={this.state.description}></textarea>
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
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
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