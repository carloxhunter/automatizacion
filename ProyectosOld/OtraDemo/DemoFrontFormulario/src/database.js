const mongoose = require('mongoose');
const URI = 'mongodb+srv://ubuntu:chichas@clusteromia.odhmh.mongodb.net/omia';
/**
 * Conectate a traves del protocolo mongodb que se encuentra local a la bd mern-tasks
 */
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('Base de datos conectada'))
  .catch(err => console.error(err));

  module.exports = mongoose;