const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Esquema de las tareas 
 */
const TaskSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true}/*,
    token : {type: String},
    modelo_primario: { type: String, required: true},
    modelo_secundario: { type: String, required: true},
    guardar_metada: {type : Boolean, required: true},
    camara_id : {type : Number, required: true},
    video : {
              tipo: { type: String, required: true},
              path: {type: String, required: true},
              url:  {type: String, required: true},
              ancho:{type: Number, required: true},
              alto: {type: Number, required: true}
    }
    */
});

/**
 * TaskSchema es solo el esquema de como van a lucir mis datos
 * Task es como lo puedo utilizar dentro mi aplicacion
 */
module.exports = mongoose.model('Task', TaskSchema);
