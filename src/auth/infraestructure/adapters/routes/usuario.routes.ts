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

import { UsuarioPrismaRepository } from '../../repositories/UsuarioPrismaRepository';
import { AuthService } from '../../../domain/services/AuthService';

// Inyección de dependencias manual (puedes mover a un archivo factory si prefieres)
const usuarioRepo = new UsuarioPrismaRepository();
const authService = new AuthService();

const registrarUsuario = new RegistrarUsuario(usuarioRepo, authService);
const iniciarSesion = new IniciarSesion(usuarioRepo, authService);
const actualizarPerfil = new ActualizarPerfil(usuarioRepo);
const cambiarContrasena = new CambiarContrasena(usuarioRepo, authService);
const obtenerPerfil = new ObtenerPerfil(usuarioRepo);

const controller = new UsuarioController(
  registrarUsuario,
  iniciarSesion,
  actualizarPerfil,
  cambiarContrasena,
  obtenerPerfil
);

// Rutas
router.post('/registro', (req, res) => controller.registro(req, res));
router.post('/login', (req, res) => controller.login(req, res));
router.get('/perfil/:id', (req, res) => controller.perfil(req, res));
router.put('/perfil/:id', (req, res) => controller.actualizar(req, res));
router.put('/password/:id', (req, res) => controller.cambiarPassword(req, res));

export default router;
