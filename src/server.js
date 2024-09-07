const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const airplanesRoutes = require('./routes/airplanes');
const flightsRoutes = require('./routes/flights');

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
    origin: 'http://localhost:3000', // Cambia esto si tu frontend está en otro dominio
    methods: ['GET', 'POST'],          //Restos de la API de Horacio, tal vez sirva despues 
    allowedHeaders: ['Content-Type'],
    credentials: true
};

// Configuración de CORS
app.use(cors(corsOptions));

// Middleware para analizar los cuerpos de las solicitudes
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas API
app.use('/airplanes', airplanesRoutes);
app.use('/flights', flightsRoutes);

// Ruta para manejar errores 404
app.use((req, res) => {
    res.status(404).send('Error 404: No encontrado');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Express Server running on http://localhost:${port}`);
});
