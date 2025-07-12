import { Usuario } from '../entities/Usuario';
import { NivelLector } from '../entities/NivelLector';

export class NivelLectorService {
  static puedeCambiarNivel(usuario: Usuario, nuevoNivel: NivelLector): boolean {
    if (nuevoNivel.value === 'intermedio' && usuario.puntuacionTotal >= 1000) return true;
    if (nuevoNivel.value === 'avanzado' && usuario.puntuacionTotal >= 5000) return true;
    if (nuevoNivel.value === 'principiante') return true;
    return false;
  }
} 