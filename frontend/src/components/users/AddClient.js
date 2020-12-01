import React,{ useState } from 'react';
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

const optionsCamera = [
	{ value: 'rtsp://pruebas_secplan:Mlc_1402@190.98.204.38/live/41DDFC2A-B0C0-4CC8-882B-61C57D85BC01', label: 'Tobalaba al sur' },
	{ value: 'rtsp://40.68.31.254:8554/aldaba', label: 'Sector calle Aldaba' },
	{ value: 'rtsp://Prueba:Prueba12@mardom-op.cams.mardom.com:50888/profile?token=media_profile1&SessionTimeout=60', label: 'Seccion bodega materiales Mardom' },
	{ value: 'rtsp://prueba:12345678@mardom-op.cams.mardom.com:50887/profile?token=media_profile1&TO=60&AB=1', label: 'Recepcion Mardom' },
	{ value: 'rtsp://pruebas_secplan:Mlc_1402@190.98.204.38/live/E7294165-0FC3-46B5-B8F2-247EF55C2DAF', label: 'Sector calle las Condes' },
];


function AddClient(){

    const [state, setState] = useState({
        id: null,
        modelo_primario: '',
        modelo_secundario: [''],
        estado: false,
        url: [],
        submitted: false,
		salida: '',
    })

    const handleChange = (name, value) => {
        setState({...state, [name]: value.value})
    }

    const handleChangeList = (name, value) => {
        var temp = [];
		if (value)
			value.forEach(element => 
					temp.push(element.value));
		setState({
			...state, [name] : temp
		});	
    }

	const enviarTarea = () => {
		var data = {
			modelo_primario: state.modelo_primario,
			estado : state.estado,
			modelo_secundario: state.modelo_secundario,
			url: state.url,
			salida: state.salida
		};

		ClientService.addNewClient(data)
			.then(response => {
				setState({
					id: response.data.id,
					modelo_primario: response.data.modelo_primario,
					modelo_secundario: response.data.modelo_secundario,
					url: response.data.url,
					submitted: true,
					salida: ""
				});
			})
		.catch(e => {
        	console.log(e);
      	});
	}
	
	const agregarAnalitica = (e) => {
		setState({})

    }

    return(
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Agregar tarea de cliente</h2>
                <div className="submit-form">
                    {state.submitted ? (
                        <div>
                            <h4>La tarea fue registrada</h4>
                        </div>
                    ) : (
                        <div>
                            <div className="form-group">  
                                <Select options={optionsModelPrimary} onChange={(value) => handleChange('modelo_primario', value)} placeholder="Elija modelo primario" name="primary" />
                            </div>
                            <div className="form-group">  
                                <Select options={optionsModelSeconday} isMulti onChange={(value) => handleChangeList('modelo_secundario', value)} placeholder="Elija modelo secundario" name="secundary"/>
                            </div>
                            <div className="form-group">  
                                <Select options={optionsCamera} isMulti onChange={(value) => handleChangeList('url', value)} placeholder="Seleccione las camaras" name="camaras"/>
                            </div>
							<div>
								{state.url.map((el, index) => {
									return(
										<div key={index}>
											<label> {el} </label>
											<button type="submit" className="btn btn-primary mb-1 mt-1 ml-1 mr-1" onClick={(e)=>agregarAnalitica(el)}>+</button>	
										</div>
									)
								})}
							</div>
                            <button onClick={enviarTarea} className="btn btn-primary btn-block">Guardar</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default AddClient;