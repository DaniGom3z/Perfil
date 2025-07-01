"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsuarioController_1 = require("../controllers/UsuarioController");
// Instancia de express.Router
const router = express_1.default.Router();
// Dependencias (inicialízalas como corresponda)
const RegistrarUsuario_1 = require("../../../application/usecases/RegistrarUsuario");
const IniciarSesion_1 = require("../../../application/usecases/IniciarSesion");
const ActualizarPerfil_1 = require("../../../application/usecases/ActualizarPerfil");
const CambiarContrasena_1 = require("../../../application/usecases/CambiarContrasena");
const ObtenerPerfil_1 = require("../../../application/usecases/ObtenerPerfil");
const UsuarioPrismaRepository_1 = require("../../repositories/UsuarioPrismaRepository");
const AuthService_1 = require("../../../domain/services/AuthService");
// Inyección de dependencias manual (puedes mover a un archivo factory si prefieres)
const usuarioRepo = new UsuarioPrismaRepository_1.UsuarioPrismaRepository();
const authService = new AuthService_1.AuthService();
const registrarUsuario = new RegistrarUsuario_1.RegistrarUsuario(usuarioRepo, authService);
const iniciarSesion = new IniciarSesion_1.IniciarSesion(usuarioRepo, authService);
const actualizarPerfil = new ActualizarPerfil_1.ActualizarPerfil(usuarioRepo);
const cambiarContrasena = new CambiarContrasena_1.CambiarContrasena(usuarioRepo, authService);
const obtenerPerfil = new ObtenerPerfil_1.ObtenerPerfil(usuarioRepo);
const controller = new UsuarioController_1.UsuarioController(registrarUsuario, iniciarSesion, actualizarPerfil, cambiarContrasena, obtenerPerfil);
// Rutas
router.post('/registro', (req, res) => controller.registro(req, res));
router.post('/login', (req, res) => controller.login(req, res));
router.get('/perfil/:id', (req, res) => controller.perfil(req, res));
router.put('/perfil/:id', (req, res) => controller.actualizar(req, res));
router.put('/password/:id', (req, res) => controller.cambiarPassword(req, res));
exports.default = router;
