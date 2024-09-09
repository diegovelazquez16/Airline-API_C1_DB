const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const usersRoutes = require('./routes/users');
const airplanesRoutes = require('./routes/airplanes');
const flightsRoutes = require('./routes/flights');
const authRoutes = require('./routes/auth'); 
const passengersRoutes = require('./routes/passengers');  
const dataBankRoutes = require('./routes/dataBank');   
const quoteRoutes = require('./routes/quoterout');
const ticketRoutes = require('./routes/ticket');
const payRouter = require('./routes/payrout');
const quoteRouter = require('./routes/quoterout');

const app = express();


const port = process.env.PORT || 4000;
const corsOptions = {
    origin: 'http://localhost:3000', // Cambia esto si tu frontend está en otro dominio
    methods: ['GET', 'POST'],          //Restos de la API de Horacio, tal vez sirva despues 
    allowedHeaders: ['Content-Type'],
    credentials: true
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/users', usersRoutes);
app.use('/airplanes', airplanesRoutes);
app.use('/flights', flightsRoutes);
app.use('/auth', authRoutes); 
app.use('/passengers', passengersRoutes);  
app.use('/dataBank', dataBankRoutes); 
app.use('/quote', quoteRoutes);
app.use('/ticket', ticketRoutes);
app.use('/pay,',payRouter) ;
app.use('/quote',quoteRouter);
// Ruta para manejar errores 404
app.use((req, res) => {
  res.status(404).send('Error 404: Not found');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
