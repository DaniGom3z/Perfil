"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
class UsuarioController {
    constructor(registrarUsuario, iniciarSesion, actualizarPerfil, cambiarContrasena, obtenerPerfil, obtenerUsuarios) {
        this.registrarUsuario = registrarUsuario;
        this.iniciarSesion = iniciarSesion;
        this.actualizarPerfil = actualizarPerfil;
        this.cambiarContrasena = cambiarContrasena;
        this.obtenerPerfil = obtenerPerfil;
        this.obtenerUsuarios = obtenerUsuarios;
    }
    registro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombreUsuario, correo, contraseña, edad, generoSexual, generosFavoritos, nivelLector, objetivoLector, paginasDiarias, objetivoSemanal, } = req.body;
                const usuario = yield this.registrarUsuario.execute(nombreUsuario, correo, contraseña, edad, generoSexual, generosFavoritos, nivelLector, objetivoLector, paginasDiarias, objetivoSemanal);
                res.status(201).json({ message: 'Usuario registrado con éxito', usuario });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { correo, contraseña } = req.body;
                const { token } = yield this.iniciarSesion.execute(correo, contraseña);
                res.status(200).json({ token });
            }
            catch (error) {
                res.status(401).json({ error: error.message });
            }
        });
    }
    perfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUsuario = Number(req.params.id);
                const usuario = yield this.obtenerPerfil.execute(idUsuario);
                res.status(200).json(usuario);
            }
            catch (error) {
                res.status(404).json({ error: error.message });
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUsuario = Number(req.params.id);
                const datos = req.body;
                yield this.actualizarPerfil.execute(idUsuario, datos);
                res.status(200).json({ message: 'Perfil actualizado' });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    cambiarPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUsuario = Number(req.params.id);
                const { contraseñaActual, nuevaContraseña } = req.body;
                yield this.cambiarContrasena.execute(idUsuario, contraseñaActual, nuevaContraseña);
                res.status(200).json({ message: 'Contraseña actualizada correctamente' });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    listarUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield this.obtenerUsuarios.execute();
                res.status(200).json(usuarios);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.UsuarioController = UsuarioController;
