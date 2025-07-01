import { UsuarioRepository } from '../../domain/repositories/UsuarioRepository';
import { Usuario } from '../../domain/entities/Usuario';

export class ObtenerPerfil {
  constructor(private readonly usuarioRepo: UsuarioRepository) {}

  async execute(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepo.buscarPorId(id);
    if (!usuario) throw new Error('Usuario no encontrado');
    return usuario;
  }
}
