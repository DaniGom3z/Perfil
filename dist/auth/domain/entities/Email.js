"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
class Email {
    constructor(valor) {
        if (!valor || !Email.validar(valor)) {
            throw new Error('Correo electrónico inválido');
        }
        this.valor = valor;
    }
    static validar(valor) {
        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(valor);
    }
    get value() {
        return this.valor;
    }
    equals(otro) {
        return this.valor === otro.valor;
    }
}
exports.Email = Email;
