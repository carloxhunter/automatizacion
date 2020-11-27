import React, {  useRef, useEffect, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

function Home(props){

    const [coord, setCoord] = useState({
        x: 0, y: 0
    });

    const [queDibujar, setqueDibujar]= useState('LINE')

    const [listCoord,SetListCoord] = useState([]);

    const [Analiticas,setAnaliticas] = useState([]);

    const canvasRef = useRef(null);
    //const imageRef = useRef(null);

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        //const image = imageRef.current;
        const image = new Image();
        const canvas = canvasRef.current;
        image.src='https://www.seguridaddeproductos.cl/wp-content/uploads/2015/04/Al-cruzar-la-calle.png'
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);
            context.beginPath(); 
            context.lineWidth = 3;
            if (listCoord.length === 1){
                context.fillStyle = "#FF0000";
                context.fillRect(listCoord[0].x,listCoord[0].y,10,10)
            }
            if (queDibujar==="LINE"){
                if (listCoord.length === 2){
                    context.moveTo(listCoord[0].x,listCoord[0].y)
                    context.lineTo(listCoord[1].x,listCoord[1].y)
                }
                else if (listCoord.length === 3){
                    context.moveTo(listCoord[0].x,listCoord[0].y)
                    context.lineTo(listCoord[1].x,listCoord[1].y)
                    context.fillRect(listCoord[2].x,listCoord[2].y,10,10)
                }
                else if (listCoord.length === 4){
                    context.moveTo(listCoord[0].x,listCoord[0].y)
                    context.lineTo(listCoord[1].x,listCoord[1].y)
                    canvas_arrow(context,listCoord[2].x,listCoord[2].y,listCoord[3].x,listCoord[3].y)
                }

                context.strokeStyle = "green";
                context.stroke();
            }else{
                if (listCoord.length >= 1){
                    let i = true;
                    listCoord.forEach(e => {
                        if (i){
                            context.moveTo(e.x,e.y);
                            i=false;
                        }
                        context.lineTo(e.x,e.y);
                    })
                    context.strokeStyle = "yellow";
                    context.stroke();
                }
            }
        }
      });

    const handleMove = (e) => {
        if(e.nativeEvent.offsetX>=0 && e.nativeEvent.offsetY>=0)
            setCoord({
                x : e.nativeEvent.offsetX,
                y:  e.nativeEvent.offsetY
            })
    }

    const handleClick = (e) => {
        if (queDibujar==="LINE"){
            if(listCoord.length < 4){
                if (listCoord.length === 3)
                    if (comprobarInterseccion(listCoord[0],listCoord[1],listCoord[2],{x:coord.x, y:coord.y}))
                        SetListCoord([
                            ...listCoord,{
                                x: coord.x,
                                y: coord.y
                            }
                        ])
                    else{
                        alert("La direccion debe intersectar a la linea")
                        listCoord.pop();
                    }
                else
                    SetListCoord([
                        ...listCoord,{
                            x: coord.x,
                            y: coord.y
                        }
                    ])
            }
        }else{
            if (listCoord.length >=3)
                if (!comprobarInterseccionPoligono(listCoord,{x:coord.x, y:coord.y}))
                    SetListCoord([
                        ...listCoord,{
                            x: coord.x,
                            y: coord.y
                        }
                    ])
                else
                    alert("Intersectaloco")
            else 
                SetListCoord([
                    ...listCoord,{
                        x: coord.x,
                        y: coord.y
                    }
                ])
        }
        return listCoord
    }

    const handleChange = (event) => {
        setqueDibujar(event.target.value);
        SetListCoord([]);
      };

    const onGuardar = () => {
        if (listCoord.length > 3) {
        setAnaliticas([
            ...Analiticas,{
                listCoord
            }
        ])
        SetListCoord([]);
    }
    }

    const onBorrar = () => {
        SetListCoord([]);
    }

    const onBorrartodo = () => {
        setAnaliticas([]);
    }

    return(
        <div className="container">
            <h1 className="py-4">App pruebas OMIA</h1>
            <FormControl component="fieldset">
                <FormLabel component="legend">Tipo de analitica a dibujar</FormLabel>
                <RadioGroup  value={queDibujar} onChange={handleChange}>
                    <FormControlLabel value="ROI" control={<Radio />} label="ROI" />
                    <FormControlLabel value="LINE" control={<Radio />} label="LineCrossing" />
                </RadioGroup>
            </FormControl>
            <div>
                <canvas ref={canvasRef} onMouseMove={handleMove} onClick={handleClick}/>
            </div>
            <div>
            <ul>
                {Analiticas.map(el => (
                <div>
                <label>
                    {JSON.stringify(el)}
                </label>
                </div>
                ))}
            </ul>
            </div>
            <Button variant="contained" color="primary" onClick={onGuardar}> Guardar Analitica </Button> 
            <Button variant="contained" color="primary" onClick={onBorrar}> Borrar </Button>
            <Button variant="contained" color="primary" onClick={onBorrartodo}> Borrar analiticas guardadas</Button> 

        </div>
    )
}
export default Home;


function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; 
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

function ccw(A,B,C){
 return (C.y-A.y) * (B.x-A.x) > (B.y-A.y) * (C.x-A.x)}

function comprobarInterseccion(A,B,C,D){
    return ((ccw(A,C,D) !== ccw(B,C,D)) && (ccw(A,B,C) !== ccw(A,B,D)))}

function comprobarInterseccionPoligono(lista, nuevoPunto){
    for (var i = 0; i < lista.length-1; i++)
            if (comprobarInterseccion(lista[i], lista[i+1], lista[lista.length-1], nuevoPunto))
                return true 
    return false
}

  /* <img ref={imageRef} onMouseMove={handleMove} src='https://finde.latercera.com/wp-content/uploads/2018/08/Fuente-Mardoqueo-ok.jpg' onClick={handleClick} alt="jiro" />
            <ul>
                {listCoord.map(el => (
                <div>
                <label>
                    {el.x} : {el.y}
                </label>
                </div>
                ))}
            </ul>
*/