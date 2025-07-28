import express from 'express';
import { UsuarioController } from '../controllers/UsuarioController';

// Instancia de express.Router
const router = express.Router();

// Dependencias (inicialízalas como corresponda)
import { RegistrarUsuario } from '../../../application/usecases/RegistrarUsuario';
import { IniciarSesion } from '../../../application/usecases/IniciarSesion';
import { ActualizarPerfil } from '../../../application/usecases/ActualizarPerfil';
import { CambiarContrasena } from '../../../application/usecases/CambiarContrasena';
import { ObtenerPerfil } from '../../../application/usecases/ObtenerPerfil';
import { ObtenerUsuarios } from '../../../application/usecases/ObtenerUsuarios';

import { UsuarioPrismaRepository } from '../../repositories/UsuarioPrismaRepository';
import { AuthService } from '../../../domain/services/AuthService';
import { RabbitMQEventPublisher } from '../../bus/RabbitMQEventPublisher';   

import { jwtMiddleware } from '../../../middleware/authMiddleware';

// Inyección de dependencias manual (puedes mover a un archivo factory si prefieres)
const usuarioRepo = new UsuarioPrismaRepository();
const authService = new AuthService();
const eventPublisher = new RabbitMQEventPublisher();

const registrarUsuario = new RegistrarUsuario(usuarioRepo, authService,eventPublisher);
const iniciarSesion = new IniciarSesion(usuarioRepo, authService);
const actualizarPerfil = new ActualizarPerfil(usuarioRepo);
const cambiarContrasena = new CambiarContrasena(usuarioRepo, authService);
const obtenerPerfil = new ObtenerPerfil(usuarioRepo);
const obtenerUsuarios = new ObtenerUsuarios(usuarioRepo);

const controller = new UsuarioController(
  registrarUsuario,
  iniciarSesion,
  actualizarPerfil,
  cambiarContrasena,
  obtenerPerfil,
  obtenerUsuarios
);

// Rutas
/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               password:
 *                 type: string
 *               // ...otros campos...
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post('/registro', (req, res) => controller.registro(req, res));
router.post('/login', (req, res) => controller.login(req, res));
router.get('/perfil/:id',jwtMiddleware ,(req, res) => controller.perfil(req, res));
router.put('/perfil/:id', jwtMiddleware,(req, res) => controller.actualizar(req, res));
router.put('/password/:id',jwtMiddleware, (req, res) => controller.cambiarPassword(req, res));
router.get('/usuarios', jwtMiddleware, (req, res) => controller.listarUsuarios(req, res));

export default router;
