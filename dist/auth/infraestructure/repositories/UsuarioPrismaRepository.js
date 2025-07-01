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
class UsuarioPrismaRepository {
    crear(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const creado = yield client_1.default.usuario.create({
                data: {
                    nombreUsuario: usuario.nombreUsuario,
                    correo: usuario.correo,
                    contraseñaHash: usuario.contraseñaHash,
                    nivelLector: usuario.nivelLector,
                    puntuacionTotal: usuario.puntuacionTotal,
                    rango: usuario.rango,
                    edad: usuario.edad,
                    generoSexual: usuario.generoSexual,
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
            return new Usuario_1.Usuario(creado.nombreUsuario, creado.correo, creado.contraseñaHash, creado.nivelLector, creado.puntuacionTotal, creado.rango, creado.historialBusquedas.map((h) => h.termino), creado.edad, creado.generoSexual, creado.generosFavoritos.map((g) => g.genero), creado.objetivoLector, creado.paginasDiarias, creado.objetivoSemanal, creado.id);
        });
    }
    buscarPorCorreo(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioDb = yield client_1.default.usuario.findUnique({
                where: { correo },
                include: {
                    historialBusquedas: true,
                    generosFavoritos: true,
                },
            });
            if (!usuarioDb)
                return null;
            return new Usuario_1.Usuario(usuarioDb.nombreUsuario, usuarioDb.correo, usuarioDb.contraseñaHash, usuarioDb.nivelLector, usuarioDb.puntuacionTotal, usuarioDb.rango, usuarioDb.historialBusquedas.map((h) => h.termino), usuarioDb.edad, usuarioDb.generoSexual, usuarioDb.generosFavoritos.map((g) => g.genero), usuarioDb.objetivoLector, usuarioDb.paginasDiarias, usuarioDb.objetivoSemanal, usuarioDb.id);
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
            return new Usuario_1.Usuario(usuarioDb.nombreUsuario, usuarioDb.correo, usuarioDb.contraseñaHash, usuarioDb.nivelLector, usuarioDb.puntuacionTotal, usuarioDb.rango, usuarioDb.historialBusquedas.map((h) => h.termino), usuarioDb.edad, usuarioDb.generoSexual, usuarioDb.generosFavoritos.map((g) => g.genero), usuarioDb.objetivoLector, usuarioDb.paginasDiarias, usuarioDb.objetivoSemanal);
        });
    }
    actualizarPerfil(id, datos) {
        return __awaiter(this, void 0, void 0, function* () {
            const { generosFavoritos } = datos, restoDatos = __rest(datos, ["generosFavoritos"]);
            yield client_1.default.$transaction([
                client_1.default.usuario.update({
                    where: { id },
                    data: restoDatos,
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
    actualizarContrasena(id, nuevaHash) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client_1.default.usuario.update({
                where: { id },
                data: { contraseñaHash: nuevaHash },
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
}
exports.UsuarioPrismaRepository = UsuarioPrismaRepository;
