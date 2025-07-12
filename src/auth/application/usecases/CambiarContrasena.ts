import { UsuarioRepository } from '../../domain/repositories/UsuarioRepository';
import { AuthService } from '../../domain/services/AuthService';
import { Password } from '../../domain/entities/Password';

export class CambiarContrasena {
  constructor(
    private readonly usuarioRepo: UsuarioRepository,
    private readonly authService: AuthService
  ) {}

  async execute(idUsuario: number, passwordActual: string, nuevaPassword: string): Promise<void> {
    const usuario = await this.usuarioRepo.buscarPorId(idUsuario);
    if (!usuario) throw new Error('Usuario no encontrado');

    const coincide = await this.authService.comparar(passwordActual, usuario.contrasena.value);
    if (!coincide) throw new Error('Contraseña actual incorrecta');

    const nuevaHash = await this.authService.hashear(nuevaPassword);
    const nuevaPasswordVO = new Password(nuevaHash);
    await this.usuarioRepo.actualizarContrasena(idUsuario, nuevaPasswordVO);
  }
}
