import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import usuarioRoutes from './auth/infraestructure/adapters/routes/usuario.routes';

const app = express();
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
