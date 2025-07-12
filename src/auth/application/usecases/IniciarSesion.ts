import { UsuarioRepository } from '../../domain/repositories/UsuarioRepository';
import { AuthService } from '../../domain/services/AuthService';
import { Email } from '../../domain/entities/Email';

export class IniciarSesion {
  constructor(
    private readonly usuarioRepo: UsuarioRepository,
    private readonly authService: AuthService
  ) {}

  async execute(correo: string, passwordPlano: string): Promise<{ token: string }> {
    const emailVO = new Email(correo);
    const usuario = await this.usuarioRepo.buscarPorCorreo(emailVO);
    if (!usuario) throw new Error('Usuario no encontrado');

    const valido = await this.authService.comparar(passwordPlano, usuario.contrasena.value);
    if (!valido) throw new Error('Contraseña incorrecta');

    const token = this.authService.generarToken({ id: usuario.id!, correo: usuario.correo.value });

    return { token };
  }
}
