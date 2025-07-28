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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioPrismaRepository = void 0;
const Usuario_1 = require("../../domain/entities/Usuario");
const client_1 = __importDefault(require("../prisma/client"));
const Email_1 = require("../../domain/entities/Email");
const Password_1 = require("../../domain/entities/Password");
const NivelLector_1 = require("../../domain/entities/NivelLector");
const GeneroSexual_1 = require("../../domain/entities/GeneroSexual");
class UsuarioPrismaRepository {
    crear(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const creado = yield client_1.default.usuario.create({
                data: {
                    nombreUsuario: usuario.nombreUsuario,
                    correo: usuario.correo.value,
                    contraseñaHash: usuario.contrasena.value,
                    nivelLector: usuario.nivelLector.value,
                    puntuacionTotal: usuario.puntuacionTotal,
                    rango: usuario.rango,
                    edad: usuario.edad,
                    generoSexual: usuario.generoSexual.value,
                    objetivoLector: usuario.objetivoLector,
                    paginasDiarias: usuario.paginasDiarias,
                    objetivoSemanal: usuario.objetivoSemanal,
                    historialBusquedas: {
                        create: usuario.historialBusquedas.map((termino) => ({ termino })),
                    },
                    generosFavoritos: {
                        create: usuario.generosFavoritos.map((genero) => ({ genero })),
                    },
                },
                include: {
                    historialBusquedas: true,
                    generosFavoritos: true,
                },
            });
            return new Usuario_1.Usuario(creado.nombreUsuario, new Email_1.Email(creado.correo), new Password_1.Password(creado.contraseñaHash), new NivelLector_1.NivelLector(creado.nivelLector), creado.puntuacionTotal, creado.rango, creado.historialBusquedas.map((h) => h.termino), creado.edad, new GeneroSexual_1.GeneroSexual(creado.generoSexual), creado.generosFavoritos.map((g) => g.genero), creado.objetivoLector, creado.paginasDiarias, creado.objetivoSemanal, creado.id);
        });
    }
    buscarPorCorreo(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioDb = yield client_1.default.usuario.findUnique({
                where: { correo: correo.value },
                include: {
                    historialBusquedas: true,
                    generosFavoritos: true,
                },
            });
            if (!usuarioDb)
                return null;
            return new Usuario_1.Usuario(usuarioDb.nombreUsuario, new Email_1.Email(usuarioDb.correo), new Password_1.Password(usuarioDb.contraseñaHash), new NivelLector_1.NivelLector(usuarioDb.nivelLector), usuarioDb.puntuacionTotal, usuarioDb.rango, usuarioDb.historialBusquedas.map((h) => h.termino), usuarioDb.edad, new GeneroSexual_1.GeneroSexual(usuarioDb.generoSexual), usuarioDb.generosFavoritos.map((g) => g.genero), usuarioDb.objetivoLector, usuarioDb.paginasDiarias, usuarioDb.objetivoSemanal, usuarioDb.id);
        });
    }
    buscarPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioDb = yield client_1.default.usuario.findUnique({
                where: { id },
                include: {
                    historialBusquedas: true,
                    generosFavoritos: true,
                },
            });
            if (!usuarioDb)
                return null;
            return new Usuario_1.Usuario(usuarioDb.nombreUsuario, new Email_1.Email(usuarioDb.correo), new Password_1.Password(usuarioDb.contraseñaHash), new NivelLector_1.NivelLector(usuarioDb.nivelLector), usuarioDb.puntuacionTotal, usuarioDb.rango, usuarioDb.historialBusquedas.map((h) => h.termino), usuarioDb.edad, new GeneroSexual_1.GeneroSexual(usuarioDb.generoSexual), usuarioDb.generosFavoritos.map((g) => g.genero), usuarioDb.objetivoLector, usuarioDb.paginasDiarias, usuarioDb.objetivoSemanal, usuarioDb.id);
        });
    }
    actualizarPerfil(id, datos) {
        return __awaiter(this, void 0, void 0, function* () {
            const { generosFavoritos, correo, nivelLector, generoSexual } = datos, restoDatos = __rest(datos, ["generosFavoritos", "correo", "nivelLector", "generoSexual"]);
            yield client_1.default.$transaction([
                client_1.default.usuario.update({
                    where: { id },
                    data: Object.assign(Object.assign(Object.assign(Object.assign({}, restoDatos), (correo ? { correo: correo.value } : {})), (nivelLector ? { nivelLector: nivelLector.value } : {})), (generoSexual ? { generoSexual: generoSexual.value } : {})),
                }),
                ...(generosFavoritos
                    ? [
                        client_1.default.generoFavorito.deleteMany({ where: { usuarioId: id } }),
                        client_1.default.generoFavorito.createMany({
                            data: generosFavoritos.map((g) => ({ genero: g, usuarioId: id })),
                        }),
                    ]
                    : []),
            ]);
        });
    }
    actualizarContrasena(id, nueva) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client_1.default.usuario.update({
                where: { id },
                data: { contraseñaHash: nueva.value },
            });
        });
    }
    actualizarHistorial(id, historial) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client_1.default.$transaction([
                client_1.default.historialBusqueda.deleteMany({ where: { usuarioId: id } }),
                client_1.default.historialBusqueda.createMany({
                    data: historial.map((h) => ({ termino: h, usuarioId: id })),
                }),
            ]);
        });
    }
    listarTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuariosDb = yield client_1.default.usuario.findMany({
                include: {
                    historialBusquedas: true,
                    generosFavoritos: true,
                },
            });
            return usuariosDb.map((usuarioDb) => new Usuario_1.Usuario(usuarioDb.nombreUsuario, new Email_1.Email(usuarioDb.correo), new Password_1.Password(usuarioDb.contraseñaHash), new NivelLector_1.NivelLector(usuarioDb.nivelLector), usuarioDb.puntuacionTotal, usuarioDb.rango, usuarioDb.historialBusquedas.map((h) => h.termino), usuarioDb.edad, new GeneroSexual_1.GeneroSexual(usuarioDb.generoSexual), usuarioDb.generosFavoritos.map((g) => g.genero), usuarioDb.objetivoLector, usuarioDb.paginasDiarias, usuarioDb.objetivoSemanal, usuarioDb.id));
        });
    }
}
exports.UsuarioPrismaRepository = UsuarioPrismaRepository;
