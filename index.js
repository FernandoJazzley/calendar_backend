const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');
require('dotenv').config();

console.log(process.env)

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

//CORS
app.use(cors());

// Directorio público

app.use(express.static('public'));
 
// Lectura y parseo del body
app.use(express.json());

//Rutas

app.use('/api/auth', require('./routes/auth'));
// TODO: auth // crear, login, renew
// TODO: CRUD: Eventos



// Rutas
/* app.get('/', (req, res) =>{

    res.json({
        ok: true
    })

}); */


// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});