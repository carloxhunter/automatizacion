import React,{Component} from 'react';
import ChromeDinoGame from 'react-chrome-dino';

class Home extends Component{
	render(){
		return(
			<div className="container">
				<h1 className="py-4">App pruebas OMIA</h1>
				<ChromeDinoGame />

			</div>
		)
	}
}
export default Home;