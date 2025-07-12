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
exports.ActualizarPerfil = void 0;
const Email_1 = require("../../domain/entities/Email");
const NivelLector_1 = require("../../domain/entities/NivelLector");
const GeneroSexual_1 = require("../../domain/entities/GeneroSexual");
class ActualizarPerfil {
    constructor(usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }
    execute(idUsuario, datos) {
        return __awaiter(this, void 0, void 0, function* () {
            const datosVO = Object.assign({}, datos);
            if (datos.correo)
                datosVO.correo = new Email_1.Email(datos.correo);
            if (datos.nivelLector)
                datosVO.nivelLector = new NivelLector_1.NivelLector(datos.nivelLector);
            if (datos.generoSexual)
                datosVO.generoSexual = new GeneroSexual_1.GeneroSexual(datos.generoSexual);
            yield this.usuarioRepo.actualizarPerfil(idUsuario, datosVO);
        });
    }
}
exports.ActualizarPerfil = ActualizarPerfil;
