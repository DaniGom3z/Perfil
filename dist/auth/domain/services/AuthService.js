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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET || 'secret_desarrollo';
        this.JWT_EXPIRACION = process.env.JWT_EXPIRACION || '1d';
    }
    hashear(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10);
            return bcryptjs_1.default.hash(password, salt);
        });
    }
    comparar(passwordPlano, passwordHash) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcryptjs_1.default.compare(passwordPlano, passwordHash);
        });
    }
    generarToken(payload) {
        const opciones = {
            expiresIn: this.JWT_EXPIRACION,
            subject: String(payload.id),
            algorithm: 'HS256'
        };
        return jsonwebtoken_1.default.sign({ id: payload.id, correo: payload.correo }, this.JWT_SECRET, opciones);
    }
    verificarToken(token) {
        return jsonwebtoken_1.default.verify(token, this.JWT_SECRET);
    }
}
exports.AuthService = AuthService;
