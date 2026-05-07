import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import User from './models/User.js';

// 1. Configurar dotenv para que Node pueda leer tu archivo .env
dotenv.config();

// 2. Inicializar la aplicación de Express
const app = express();

// 3. Usar body-parser para que tu servidor entienda los datos JSON que lleguen de React
app.use(bodyParser.json());

// RUTA PARA REGISTRAR USUARIOS
app.post('/api/users/register', async (req, res) => {
    try {
        const { nombre, apellido, tipoDocumento, numeroDocumento, correo, direccion, contraseña, tipoUsuario } = req.body;

        // Creamos una nueva instancia del usuario con los datos que vienen de React
        const nuevoUsuario = new User({
            nombre,
            apellido,
            tipoDocumento,
            numeroDocumento,
            correo,
            direccion,
            contraseña,
            tipoUsuario // Si no viene nada, por defecto será 'cliente'
        });

        // Guardamos en MongoDB
        await nuevoUsuario.save();
        
        res.status(201).json({ mensaje: "Usuario creado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al registrar usuario", error: error.message });
    }
});

// 4. Traer las variables de tu archivo .env
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.mongo_URL;

// 5. Conectar a MongoDB usando Mongoose
mongoose.connect(MONGO_URL)
  .then(() => {
    // Si la conexión es exitosa, se ejecuta esto:
    console.log('¡Conexión exitosa a la base de datos de DHS en MongoDB!');
    
    // Solo encendemos el servidor Express si la base de datos conectó bien
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    // Si hay un error (por ejemplo, si no tienes Compass abierto o el servicio de Mongo apagado)
    console.error('Error conectando a MongoDB:', error);
  });