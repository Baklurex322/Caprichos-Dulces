// Importamos las librerías necesarias
 /*const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para procesar datos en formato JSON
app.use(bodyParser.json());

// Conexión a la base de datos (ajusta los valores de acuerdo con tu configuración)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  
    password: '',  
    database: 'caprichos'  
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa con la base de datos');
});

// Ruta para el inicio de sesión
app.post('/login', (req, res) => {
    const { correo, contraseña } = req.body;

    // Validamos si ambos campos fueron enviados
    if (!correo || !contraseña) {
        return res.status(400).json({ message: 'Por favor ingresa tu correo y contraseña.' });
    }

    // Consulta SQL para validar las credenciales
    const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
    connection.query(query, [correo, contraseña], (err, results) => {
        if (err) {
            console.error('Error al realizar la consulta:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        // Si encontramos el usuario en la base de datos
        if (results.length > 0) {
            return res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});*/
