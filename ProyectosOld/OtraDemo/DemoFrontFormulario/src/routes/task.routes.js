const express = require('express');
const router = express.Router();

const Task = require('../models/task');
/**
 * Ruta que atraves de  et cuando llegue una peticion a la pagina principal voy a responder
 * Callback funcion que se ejecuta cuando la consulta ha sido terminada
 * Es mejor codigo asincrono, tarea que se ejcuta luego que termina de hacer otra
 * await la tarea find toma un tiempo y luego que termine las almacene en tasks
 */
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);

});

/**
 * Obtener una unica tarea
 */
router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task)
});

/**
 * Agregar tareas (post). Recibir los datos del navegador. Para ver los datos estaran en el req
 * El navegador me envia datos y yo los recibo por req.body
 * Cliente rest para testear nuestra api rest
 */
router.post('/', async (req, res) => {
    const { modelo_primario, modelo_secundario, guardar_meta } = req.body;
    const task = new Task({ modelo_primario, modelo_secundario, guardar_meta });
    await task.save();
    res.json({ status: 'Task saved!!' });
});


/**
 * Actualizar
 */
router.put('/:id', async (req, res) => {
    const { modelo_primario, modelo_secundario, guardar_meta } = req.body;
    const newTask = { modelo_primario, modelo_secundario, guardar_meta };
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Task Updated yes!!'});
});

/**
 * Delete
 */
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Task Deleted :('});
});


module.exports = router;