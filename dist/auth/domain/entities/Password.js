"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
class Password {
    constructor(hash) {
        if (!hash || hash.length < 6) {
            throw new Error('La contraseña es muy corta');
        }
        this.hash = hash;
    }
    get value() {
        return this.hash;
    }
    equals(otro) {
        return this.hash === otro.hash;
    }
}
exports.Password = Password;
