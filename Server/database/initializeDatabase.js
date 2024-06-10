const mysql = require("mysql2/promise");
require('dotenv').config(); // Cargar variables de entorno

const createTables = async () => {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        waitForConnections: true,
        connectionLimit: 5000,
        queueLimit: 1000
});
    try {
        const connection = await pool.getConnection();
    
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
    
        await connection.query(`USE ${process.env.DB_DATABASE}`);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS survey_responses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                gender VARCHAR(10),
                age DATE,
                image_choice VARCHAR(50),
                brand_choice VARCHAR(50),
                time_spent JSON
            )
            `);
            console.log("Tabla survey_responses creada exitosamente");

            connection.release();
    } catch (error) {
        console.error('Error al crear la tabla survey_responses: ', error);
    } finally {
        await pool.end();
    };

}

createTables();
//para inicializarlo utilizar el comando "node dataBase/initializeDatabase.js"