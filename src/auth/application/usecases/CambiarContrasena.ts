import { UsuarioRepository } from '../../domain/repositories/UsuarioRepository';
import { AuthService } from '../../domain/services/AuthService';

export class CambiarContrasena {
  constructor(
    private readonly usuarioRepo: UsuarioRepository,
    private readonly authService: AuthService
  ) {}

  async execute(idUsuario: number, passwordActual: string, nuevaPassword: string): Promise<void> {
    const usuario = await this.usuarioRepo.buscarPorId(idUsuario);
    if (!usuario) throw new Error('Usuario no encontrado');

    const coincide = await this.authService.comparar(passwordActual, usuario.contraseñaHash);
    if (!coincide) throw new Error('Contraseña actual incorrecta');

    const nuevaHash = await this.authService.hashear(nuevaPassword);
    await this.usuarioRepo.actualizarContrasena(idUsuario, nuevaHash);
  }
}
