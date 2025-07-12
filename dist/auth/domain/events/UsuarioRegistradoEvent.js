"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRegistradoEvent = void 0;
class UsuarioRegistradoEvent {
    constructor(usuarioId, correo, fechaRegistro) {
        this.usuarioId = usuarioId;
        this.correo = correo;
        this.fechaRegistro = fechaRegistro;
    }
}
exports.UsuarioRegistradoEvent = UsuarioRegistradoEvent;
