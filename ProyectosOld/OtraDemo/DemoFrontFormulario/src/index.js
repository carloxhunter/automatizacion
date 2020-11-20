const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongoose } = require('./database');


const app = express();

//Settings ********************************************************************
/**
 * Esto es para indicarle la configuracion del puerto, que tome el puerto del 
 * sistema operativo o el que este configurado. Cuando esta en la nube, nos dan el puerto
 * o sino que tome el por defecto el 3000
 */

app.set('port', process.env.PORT || 3000);



//Middlewares *****************************************************************
/**
 * Funciones que se ejecutan antes de que lleguen a nuestras rutas
 * Ver el mensaje de alguna manera
 * Un cliente hizo una petición get a la ruta principal de mi app y 
 * el servidor le repondio con un codigo de respuesta y el tiempo
 * y el peso es el otro valor
 */
app.use(morgan('dev'));

/**
 * React envia datos y el servidor devuelve datos
 * Intercambio de datos en formato JSON
 * Cada vez que llegue un dato al servidor, pasa por la funcion y comprueba que es JSON
 * y vamos apoder acceder a el.
 */
app.use(express.json());

//Routes ***********************************************************************

app.use('/api/tasks', require('./routes/task.routes'));





//Static files ******************************************************************
/**
 * _dirname en donde esta el archivo index.js. Join me permite darle las cosas que queremos unir
 * Mi carpeta esta en esa direcciòn
 */
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Static por defecto encuentra la carpeta public, pero en nuestro caso debemos pasarle la
 * ruta de src
 */

//Starting the server ************************************************************

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});