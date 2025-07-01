import { UsuarioRepository } from '../../domain/repositories/UsuarioRepository';

interface DatosPerfil {
  nombreUsuario?: string;
  correo?: string;
  nivelLector?: 'principiante' | 'intermedio' | 'avanzado';
  edad?: number;
  generoSexual?: string;
  generosFavoritos?: string[];
  objetivoLector?: string;
  paginasDiarias?: number;
  objetivoSemanal?: string;
}

export class ActualizarPerfil {
  constructor(private readonly usuarioRepo: UsuarioRepository) {}

  async execute(idUsuario: number, datos: Partial<DatosPerfil>): Promise<void> {
    await this.usuarioRepo.actualizarPerfil(idUsuario, datos);
  }
}
