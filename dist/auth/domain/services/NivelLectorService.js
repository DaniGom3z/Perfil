"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NivelLectorService = void 0;
class NivelLectorService {
    static puedeCambiarNivel(usuario, nuevoNivel) {
        if (nuevoNivel.value === 'intermedio' && usuario.puntuacionTotal >= 1000)
            return true;
        if (nuevoNivel.value === 'avanzado' && usuario.puntuacionTotal >= 5000)
            return true;
        if (nuevoNivel.value === 'principiante')
            return true;
        return false;
    }
}
exports.NivelLectorService = NivelLectorService;
