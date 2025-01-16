const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();

// Configurar conexión a la base de datos PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://logincamgreen_db_user:DBkUdi9tt7QxiqKGRRfNrVOS1REE38hx@dpg-cu471ntds78s739p6gbg-a.oregon-postgres.render.com:5432/logincamgreen_db',
    ssl: {
        rejectUnauthorized: false, // Necesario para Render
    },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sirve archivos estáticos desde el directorio raíz
app.use(express.static(path.join(__dirname, './')));

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Ruta para manejar inicio de sesión
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado.' });
        }

        const user = result.rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        if (!user.estado) {
            return res.status(403).json({ message: 'Usuario inactivo.' });
        }

        res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// Puerto para el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
