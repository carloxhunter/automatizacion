import React, {  useRef, useEffect, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

function DibujarAnaliticas(props){

    const [coord, setCoord] = useState({x: 0, y: 0});

    const [nombreAnalitica, setnombreAnalitica] = useState("");

    const [queDibujar, setqueDibujar]= useState('LINE')
    //Lista de coordenadas de la analitica actual
    const [listCoord,SetListCoord] = useState([]);
    //Lista de coordendas y nombres y todas las analiticas guardadas
    const [Analiticas,setAnaliticas] = useState([]);

    const canvasRef = useRef(null);
    //const imageRef = useRef(null);

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        //const image = imageRef.current;
        const image = new Image();
        const canvas = canvasRef.current;
        image.src= props.fotoUrl;
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

    const onMouseMove = (e) => {
        if(e.nativeEvent.offsetX>=0 && e.nativeEvent.offsetY>=0)
            setCoord({
                x : e.nativeEvent.offsetX,
                y:  e.nativeEvent.offsetY
            })
    }

    const onMouseClick = (e) => {
        if (queDibujar==="LINE"){
            if(listCoord.length < 4){
                if (listCoord.length === 3)
                    if (seg_intersection(listCoord[0],listCoord[1],listCoord[2],{x:coord.x, y:coord.y}))
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
                    alert("No puedes intersectar segmentos")
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

    const onQueDibujar = (event) => {
        setqueDibujar(event.target.value);
        SetListCoord([]);
      };

    const onGuardar = () => {
        let temp = {nombre: nombreAnalitica, coordenadas : listCoord}
        if (listCoord.length > 3) {
            setAnaliticas([
                ...Analiticas,{temp}
            ])
            SetListCoord([])
        }
    }
    const {Callback} = props;

    useEffect(()=>{
        function mandarInfo(){
            Callback(Analiticas)
        };
        mandarInfo();
    },[Analiticas]);

    return(
        <div className="container">
            <FormControl component="fieldset">
                <FormLabel component="legend">Tipo de analitica a dibujar</FormLabel>
                <RadioGroup  value={queDibujar} onChange={onQueDibujar}>
                    <FormControlLabel value="ROI" control={<Radio />} label="ROI" />
                    <FormControlLabel value="LINE" control={<Radio />} label="LineCrossing" />
                </RadioGroup>
            </FormControl>
            <div><input placeholder="Nombre analitica"   type='text' onChange={(e) => setnombreAnalitica(e.target.value)}/></div>
            <label></label>
            <div>
                <canvas ref={canvasRef} onMouseMove={onMouseMove} onClick={onMouseClick}/>
                <ul>
                    {Analiticas.map((el, index) => (
                    <div key={index}>
                        <label>
                            {JSON.stringify(el.temp.nombre)}
                        </label>
                        <button className="btn btn-danger mb-1 mt-1 ml-1 mr-1" onClick={(e)=>Analiticas.splice(index,1)}>-</button>
                    </div>
                    ))}
                </ul>
            </div>
            <div>

            </div>
            <div>
                <Button variant="contained" color="primary" onClick={() => SetListCoord([])}> Borrar analitica actual </Button>
                <Button variant="contained" color="primary" onClick={() => setAnaliticas([])}> Borrar todas las analiticas guardadas</Button> 
                <Button variant="contained" color="primary" onClick={onGuardar}> Guardar Analitica </Button> 
            </div>     
        </div>
    )
}
export default DibujarAnaliticas;


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

function area_triang(a,b,c){
    return (b.x-a.x)*(c.y-a.y)-(c.x-a.x)*(b.y-a.y)
}

function side_p_to_seg(v1,v2,p){
    let area = area_triang(v1,v2,p);
    let lado = '';
    if (area > 0 )
        lado = "izq";
    else if (area < 0) 
        lado = "der";
    else
        lado = "col";
    return lado;
}

function seg_intersection(u1,u2,v1,v2){
    if (side_p_to_seg(u1,u2,v1) === "col" ||
        side_p_to_seg(u1,u2,v2) === "col" ||
        side_p_to_seg(v1,v2,u1) === "col" ||
        side_p_to_seg(v1,v2,u2) === "col")
        return false
    else 
        if (((side_p_to_seg(u1,u2,v1) === "izq" && 
            side_p_to_seg(u1,u2,v2) === "der") ||
            (side_p_to_seg(u1,u2,v1) === "der" && 
            side_p_to_seg(u1,u2,v2) === "izq"))&&
            ((side_p_to_seg(v1,v2,u1) === "der" &&
            side_p_to_seg(v1,v2,u2) === "izq") ||
            (side_p_to_seg(v1,v2,u1) === "izq" &&
            side_p_to_seg(v1,v2,u2) === "der")))
            return true
    else
        return false
}

function comprobarInterseccionPoligono(lista, nuevoPunto){
    for (var i = 0; i < lista.length-1; i++)
            if (seg_intersection(lista[i], lista[i+1], lista[lista.length-1], nuevoPunto)){
                return true 
            }
    return false
}
