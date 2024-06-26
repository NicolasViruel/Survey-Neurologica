const mysql = require("mysql2/promise");
require('dotenv').config(); // Cargar variables de entorno

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 5000,
    queueLimit: 1000
});

console.log("Conexión a la base de datos🌝");

module.exports ={
    pool
}