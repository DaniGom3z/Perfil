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
exports.CambiarContrasena = void 0;
const Password_1 = require("../../domain/entities/Password");
class CambiarContrasena {
    constructor(usuarioRepo, authService) {
        this.usuarioRepo = usuarioRepo;
        this.authService = authService;
    }
    execute(idUsuario, passwordActual, nuevaPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield this.usuarioRepo.buscarPorId(idUsuario);
            if (!usuario)
                throw new Error('Usuario no encontrado');
            const coincide = yield this.authService.comparar(passwordActual, usuario.contrasena.value);
            if (!coincide)
                throw new Error('Contraseña actual incorrecta');
            const nuevaHash = yield this.authService.hashear(nuevaPassword);
            const nuevaPasswordVO = new Password_1.Password(nuevaHash);
            yield this.usuarioRepo.actualizarContrasena(idUsuario, nuevaPasswordVO);
        });
    }
}
exports.CambiarContrasena = CambiarContrasena;
