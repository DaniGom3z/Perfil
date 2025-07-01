import { UsuarioRepository } from '../../domain/repositories/UsuarioRepository';
import { AuthService } from '../../domain/services/AuthService';

export class IniciarSesion {
  constructor(
    private readonly usuarioRepo: UsuarioRepository,
    private readonly authService: AuthService
  ) {}

  async execute(correo: string, passwordPlano: string): Promise<{ token: string }> {
    const usuario = await this.usuarioRepo.buscarPorCorreo(correo);
    if (!usuario) throw new Error('Usuario no encontrado');

    const valido = await this.authService.comparar(passwordPlano, usuario.contraseñaHash);
    if (!valido) throw new Error('Contraseña incorrecta');

    const token = this.authService.generarToken({ id: usuario.id!, correo: usuario.correo });

    return { token };
  }
}
