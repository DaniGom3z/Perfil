"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NivelLector = void 0;
class NivelLector {
    constructor(nivel) {
        if (!['principiante', 'intermedio', 'avanzado'].includes(nivel)) {
            throw new Error('Nivel lector inválido');
        }
        this.nivel = nivel;
    }
    get value() {
        return this.nivel;
    }
    equals(otro) {
        return this.nivel === otro.nivel;
    }
}
exports.NivelLector = NivelLector;
