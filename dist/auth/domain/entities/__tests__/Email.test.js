"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Email_1 = require("../Email");
describe('Email Value Object', () => {
    it('debería crear un email válido', () => {
        const email = new Email_1.Email('test@example.com');
        expect(email.value).toBe('test@example.com');
    });
    it('debería lanzar error para email inválido', () => {
        expect(() => new Email_1.Email('invalido')).toThrow('Correo electrónico inválido');
    });
});
