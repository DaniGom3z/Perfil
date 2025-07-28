import { UsuarioRepository } from '../../domain/repositories/UsuarioRepository';
import { Usuario } from '../../domain/entities/Usuario';

export class ObtenerUsuarios {
  constructor(private readonly usuarioRepo: UsuarioRepository) {}

  async execute(): Promise<Usuario[]> {
    return await this.usuarioRepo.listarTodos();
  }
}
