"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneroSexual = void 0;
class GeneroSexual {
    constructor(genero) {
        if (!genero || genero.length < 3) {
            throw new Error('Género sexual inválido');
        }
        this.genero = genero;
    }
    get value() {
        return this.genero;
    }
    equals(otro) {
        return this.genero === otro.genero;
    }
}
exports.GeneroSexual = GeneroSexual;
