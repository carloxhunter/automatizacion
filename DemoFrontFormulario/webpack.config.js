/**
 * Archivo que va a convertir es la entrada de webpack
 * Codigo convertido sera la salida
 * Toma el archivo y lo convierte y lo coloca en la carpeta public
 */
module.exports = {
    entry: './src/app/index.js',
    output: {
        path: __dirname + '/src/public',
        filename: 'bundle.js'
    },
    module:{
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};