import React,{Component} from 'react';
import ChromeDinoGame from 'react-chrome-dino';


class Home extends Component{
	constructor(props) {
		super(props);
		this.state = { x: 0, y: 0 };
	  }
	
	  _onMouseMove(e) {
		this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
	  }
	render(){
		const { x, y } = this.state;

		return(
			<div className="container">
				<h1 className="py-4">App pruebas OMIA</h1>
				<ChromeDinoGame />
				<div>
					<img onMouseMove={this._onMouseMove.bind(this)} width="100" height="150" src='https://finde.latercera.com/wp-content/uploads/2018/08/Fuente-Mardoqueo-ok.jpg' />
				</div>
				<h1>{ x } { y }</h1><br/>
			</div>
		)
	}
}
export default Home;

/*import React, { Component, useState, useEffect } from 'react'
import img1 from '../testImages/road4.jpg'
import $ from 'jquery'

class home extends Component {
    constructor(props) {
        super(props)

        this.inputRef1 = React.createRef()

        this.state = {
            point1: { "x1": 0, "y1": 0 },
            point2: { "x2": 0, "y2": 0 },
            widthRect: 0,
            heightRect: 0,
            widthImg: 0,
            heightImg: 0,
            tempImg: img1,
            rectInCanvas: false,
            isValidRect: false,
            isValidClass: false,
            foucsInputRef: false,
            rectColor: 'rgb(0, 255, 255)',
            rectData: [],
            boxes: [],
            fileName: 'road1.jpg',
            boxClass: null
        }

        this.init = this.init.bind(this)
        this.mouseDown = this.mouseDown.bind(this)
        this.mouseUp = this.mouseUp.bind(this)
        this.mouseMove = this.mouseMove.bind(this)
        this.draw = this.draw.bind(this)
        this.handleSize = this.handleSize.bind(this)
        this.onImgLoad = this.onImgLoad.bind(this)
        this.drawImage = this.drawImage.bind(this)
        this.addRect = this.addRect.bind(this)
        this.showData = this.showData.bind(this)
        this.resetData = this.resetData.bind(this)
        this.finalSubmitt = this.finalSubmitt.bind(this)
        this.focusClassInput = this.focusClassInput.bind(this)
        this.inputBoxClass = this.inputBoxClass.bind(this)
    }


    componentDidMount() {
        this.canvas = document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.rect = {}
        this.canvasX = this.canvas.offsetLeft
        this.canvasY = this.canvas.offsetTop
        this.drag = false
        this.drawImage(this.state.tempImg)
        this.init()
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.state.isValidRect) {
            $('#classInput').prop('disabled', false)
        }
        else {
            $('#classInput').prop('disabled', true)
        }

        this.focusClassInput()

        if (this.state.isValidClass) {
            $('#addButton').prop('disabled', false)
        }
        else {
            $('#addButton').prop('disabled', true)
        }

        if (this.state.tempImg !== prevState.tempImg)
            this.drawImage(this.state.tempImg)
    }

    init = () => {
        this.canvas.addEventListener('mousedown', this.mouseDown, false)
        this.canvas.addEventListener('mouseup', this.mouseUp, false)
        this.canvas.addEventListener('mousemove', this.mouseMove, false)
    }

    mouseDown = (e) => {
        // console.log(this.canvasX, this.canvasY, 'coordinates'/)
        this.rect.x = e.pageX - this.canvasX + 0
        this.rect.y = e.pageY - this.canvasY + 0
        this.rect.w = 0
        this.rect.h = 0
        this.setState({
            point1: { "x1": this.rect.x, "y2": this.rect.y },
            point2: { "x2": 0, "y2": 0 },
            widthRect: 0,
            isValidRect: false,
            isValidClass: false,
            heightRect: 0,
            boxClass: ''
        })
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drag = true
    }

    mouseMove = (e) => {
		console.log(this.rect.x)

        if (this.drag) {
            this.rect.w = (e.pageX - this.canvasX) - this.rect.x
            this.rect.h = (e.pageY - this.canvasY) - this.rect.y
            this.setState({
                point2: {
                    "x2": this.rect.x > (this.rect.x + this.rect.w) ?
                        this.rect.x : (this.rect.x + this.rect.w),
                    "y2": this.rect.y > (this.rect.y + this.rect.h) ?
                        this.rect.y : (this.rect.y + this.rect.h)
                },
                point1: {
                    "x1": this.rect.x < (this.rect.x + this.rect.w) ?
                        this.rect.x : (this.rect.x + this.rect.w),
                    "y1": this.rect.y < (this.rect.y + this.rect.h) ?
                        this.rect.y : (this.rect.y + this.rect.h)
                },
                widthRect: Math.abs(this.rect.w),
                heightRect: Math.abs(this.rect.h)
            })
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.draw()
        }
    }

    mouseUp = () => {
        this.drag = false

        if (this.state.widthRect == 0 || this.state.heightRect == 0) {
            this.setState({
                isValidRect: false
            })
        }
        else {
            this.setState({
                isValidRect: true,
                foucsInputRef: true
            })
        }
    }


    draw = () => {
        this.ctx.lineWidth = 1.5
        this.ctx.strokeStyle = this.state.rectColor
        this.ctx.strokeRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h)
    }

    onImgLoad({ target: img }) {
        console.log(img, img.offsetWidth, img.offsetHeight, 'in ImgLoad')
    }

    drawImage = (image) => {
        var x = new Image()
        x.src = image
        x.onload = () => {
            this.setState({
                widthImg: x.width,
                heightImg: x.height
            })
            console.log('in drawImage', this.state.tempImg, this.state.widthImg, x.height)
        }
    }

    handleSize(e) {
        this.setState({

            tempImg: e.target.value,
        })
    }

    handleFile = (event) => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        console.log(event.target.files[0].name, 'fileName')
        this.setState({
            point1: { "x1": 0, "y1": 0 },
            point2: { "x2": 0, "y2": 0 },
            widthRect: 0,
            heightRect: 0,
            boxes: [],
            foucsInputRef: false,
            isValidRect: false,
            isValidClass: false,
            boxClass: '',
            fileName: event.target.files[0].name,
            tempImg: URL.createObjectURL(event.target.files[0])
        })
    }

    addRect = () => {
        if (!this.state.isValidRect) {
            alert('invalid BoundingBox')
        }
        else if (this.state.boxClass == '') {
            $('#classInput').css('border', '1px solid red')

        }
        else {
            $('#classInput').css('border', '1px solid black')
            this.setState({
                boxes: [...this.state.boxes, { "id": this.state.fileName, "class": this.state.boxClass, "topLeft": this.state.point1, "bottomRight": this.state.point2 }],
                boxClass: ''
            })
        }
        document.getElementById('classInput').value = ''
        console.log('add function ')


    }

    finalSubmitt = () => {
        console.log(this.state.boxes.length, 'boxLength')
        this.setState({
            rectData: [...this.state.rectData, [...this.state.boxes]]
        })
    }

    showData() {
        console.log('Data', this.state.rectData)
    }

    resetData() {
        this.setState({
            rectData: [],
            boxes: []
        })
    }

    focusClassInput = () => {
        if (this.state.foucsInputRef && this.state.isValidRect)
            this.inputRef1.current.focus()
    }

    inputBoxClass = (e) => {
        this.setState({
            boxClass: e.target.value
        })
        this.setState({
            isValidClass: (this.state.boxClass == '') ? false: true
        })
    }

    render() {
        var mystyle = {
            // display: 'flex',
            backgroundImage: `url(${this.state.tempImg})`,
            margin: '20px 50px',
            border: '2px solid black'

        };


        return (
            <div>
                <div className='mainContainer'>
                    <div className='leftContainer'>
                        <div style={{ width: "100%" }}>
                            <canvas id="canvas" style={mystyle} width={this.state.widthImg} height={this.state.heightImg}></canvas>
                        </div>
                        <div className='buttonDiv'>
                            <input type='text' ref={this.inputRef1} id='classInput' placeholder='className' onChange={this.inputBoxClass} style={{ height: '16px' }}></input>
                            <button type='submitt' id='addButton' title="add rectangle to dataset" onClick={this.addRect}> AddRect </button>
                            <button onClick={this.finalSubmitt}> FinalSubmitt </button>
                            <button onClick={this.showData}>Show Data</button>
                            <button onClick={this.resetData}>Reset Data</button>
                        </div>
                    </div>
                    <div className='rightContainer'>
                        <p><strong>(X1, Y1): </strong> ({this.state.point1.x1}, {this.state.point1.y1})</p>
                        <p><strong>(X2, Y2): </strong> ({this.state.point2.x2}, {this.state.point2.y2})</p>
                        <p><strong>Size: </strong> ({this.state.widthRect}X{this.state.heightRect})</p>
                        <form >
                            <label for="file-input"></label>
                            <input id="file-input" type="file" onChange={this.handleFile} />
                        </form>
                        <p id='demo'></p>
                    </div>
                </div>

            </div>
        )
    }
}

export default home*/

