const mysql = require('mysql2');
require('dotenv').config(); 

const db = mysql.createConnection({
  host: "localhost",       
  user: "root",       
  password: "v3lazqu3z", 
  database: "flights_db" 
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

module.exports = db;
