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
exports.IniciarSesion = void 0;
const Email_1 = require("../../domain/entities/Email");
class IniciarSesion {
    constructor(usuarioRepo, authService) {
        this.usuarioRepo = usuarioRepo;
        this.authService = authService;
    }
    execute(correo, passwordPlano) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailVO = new Email_1.Email(correo);
            const usuario = yield this.usuarioRepo.buscarPorCorreo(emailVO);
            if (!usuario)
                throw new Error('Usuario no encontrado');
            const valido = yield this.authService.comparar(passwordPlano, usuario.contrasena.value);
            if (!valido)
                throw new Error('Contraseña incorrecta');
            const token = this.authService.generarToken({ id: usuario.id, correo: usuario.correo.value });
            return { token };
        });
    }
}
exports.IniciarSesion = IniciarSesion;
