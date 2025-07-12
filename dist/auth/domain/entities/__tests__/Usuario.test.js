"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = require("../Usuario");
const Email_1 = require("../Email");
const Password_1 = require("../Password");
const NivelLector_1 = require("../NivelLector");
const GeneroSexual_1 = require("../GeneroSexual");
describe('Usuario', () => {
    it('debería actualizar el perfil correctamente', () => {
        const usuario = new Usuario_1.Usuario('Juan', new Email_1.Email('juan@mail.com'), new Password_1.Password('hash1234'), new NivelLector_1.NivelLector('principiante'), 0, 'lector', [], 25, new GeneroSexual_1.GeneroSexual('masculino'), ['aventura'], 'mejorar', 10, 'leer más');
        usuario.actualizarPerfil({ nombreUsuario: 'Juanito', paginasDiarias: 20 });
        expect(usuario.nombreUsuario).toBe('Juanito');
        expect(usuario.paginasDiarias).toBe(20);
    });
});
