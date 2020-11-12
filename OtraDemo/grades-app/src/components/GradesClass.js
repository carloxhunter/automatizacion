import React, { Component } from 'react';
import GradeDataService from '../services/GradeService';

export default class GradesClass extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentGrade: {
                id: null,
                name: '',
                subject: '',
                type: '',
                value: '',
            },
            message: ''
        }
    }

    componentDidMount(){
        this.getGrade(this.props.match.params.id);
    }

    getGrade = (id) => {
        GradeDataService.get(id)
        .then((response) => {
            const obj = response.data[0];

            this.setState(this.currentGrade = {
                id: obj._id,
                name: obj.name,
                subject: obj.subject,
                type: obj.type,
                value: obj.value,
            });
        })
        .catch((e) => {
            console.log(e);
        });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState(this.currentGrade = { ...this.currentGrade, [name]: value });
    };

    updateGrade = () => {
        GradeDataService.update(this.currentGrade.id, this.currentGrade)
        .then((response) => {
            this.setState(this.message = 'The grade was updated successfully!');
        })
        .catch((e) => {
            console.log(e);
        });
    };

    deleteGrade = () => {
        GradeDataService.remove(this.currentGrade.id)
        .then((response) => {
            this.props.history.push('/grade');
        })
        .catch((e) => {
            console.log(e);
        });
    };

    render() {
        const currentGrade = this.currentGrade;
        const message = this.message;

        return (
            <div>
                {currentGrade ? (
                    <div className="edit-form">
                    <h4>Grade</h4>
                    <form>
                        <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={currentGrade.name}
                            onChange={this.handleInputChange}
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            className="form-control"
                            id="subject"
                            name="subject"
                            value={currentGrade.subject}
                            onChange={this.handleInputChange}
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <input
                            type="text"
                            className="form-control"
                            id="type"
                            name="type"
                            value={currentGrade.type}
                            onChange={this.handleInputChange}
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="value">Value</label>
                        <input
                            type="number"
                            className="form-control"
                            id="value"
                            name="value"
                            value={currentGrade.value}
                            onChange={this.handleInputChange}
                        />
                        </div>
                    </form>

                    <button className="badge badge-danger mr-2" onClick={this.deleteGrade}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={this.updateGrade}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                    </div>
                ) : (
                    <div>
                    <br />
                    <p>Please click on a Grade...</p>
                    </div>
                )}
            </div>
        )
    }
}
