import React,{Component} from 'react';



/*
let runPy = new Promise(function(success, nosuccess) {

	const { spawn } = require('child_process');
	const pyprog = spawn('python', ['./../pypy.py']);

	pyprog.stdout.on('data', function(data) {

		success(data);
	});

	pyprog.stderr.on('data', (data) => {

		nosuccess(data);
	});
});
*/


class Ejecucion extends Component{
	render(){
		return(
			<div className="container">
				<h1 className="py-4">Crud-Application-React-NodeJS-Mongo-Database</h1>
			</div>
		)
	}
}




export default Ejecucion;