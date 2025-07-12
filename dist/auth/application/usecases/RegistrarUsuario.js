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
exports.RegistrarUsuario = void 0;
const Usuario_1 = require("../../domain/entities/Usuario");
const Email_1 = require("../../domain/entities/Email");
const Password_1 = require("../../domain/entities/Password");
const NivelLector_1 = require("../../domain/entities/NivelLector");
const GeneroSexual_1 = require("../../domain/entities/GeneroSexual");
class RegistrarUsuario {
    constructor(usuarioRepo, authService, publisher) {
        this.usuarioRepo = usuarioRepo;
        this.authService = authService;
        this.publisher = publisher;
    }
    execute(nombre, correo, passwordPlano, edad, generoSexual, generosFavoritos, nivelLector, objetivoLector, paginasDiarias, objetivoSemanal) {
        return __awaiter(this, void 0, void 0, function* () {
            let emailVO;
            try {
                emailVO = new Email_1.Email(correo);
            }
            catch (e) {
                throw new Error('Correo electrónico inválido');
            }
            const existente = yield this.usuarioRepo.buscarPorCorreo(emailVO);
            if (existente)
                throw new Error('Ya existe un usuario con ese correo');
            let passwordVO;
            let nivelLectorVO;
            let generoSexualVO;
            try {
                const hash = yield this.authService.hashear(passwordPlano);
                passwordVO = new Password_1.Password(hash);
                nivelLectorVO = new NivelLector_1.NivelLector(nivelLector);
                generoSexualVO = new GeneroSexual_1.GeneroSexual(generoSexual);
            }
            catch (e) {
                throw new Error('Datos de usuario inválidos: ' + (e instanceof Error ? e.message : 'Error desconocido'));
            }
            const nuevoUsuario = new Usuario_1.Usuario(nombre, emailVO, passwordVO, nivelLectorVO, 0, 'lector', [], edad, generoSexualVO, generosFavoritos, objetivoLector, paginasDiarias, objetivoSemanal);
            const creado = yield this.usuarioRepo.crear(nuevoUsuario);
            // Emitir evento
            yield this.publisher.publish('usuario.registrado', {
                idUsuario: creado.id,
                correo: creado.correo.value,
                fechaRegistro: new Date()
            });
            return creado;
        });
    }
}
exports.RegistrarUsuario = RegistrarUsuario;
