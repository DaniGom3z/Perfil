import { UsuarioRepository } from '../../domain/repositories/UsuarioRepository';
import { Usuario } from '../../domain/entities/Usuario';
import { AuthService } from '../../domain/services/AuthService';

export class RegistrarUsuario {
  constructor(
    private readonly usuarioRepo: UsuarioRepository,
    private readonly authService: AuthService
  ) {}

  async execute(
    nombre: string,
    correo: string,
    passwordPlano: string,
    edad: number,
    generoSexual: string,
    generosFavoritos: string[],
    nivelLector: 'principiante' | 'intermedio' | 'avanzado',
    objetivoLector: string,
    paginasDiarias: number,
    objetivoSemanal: string
  ): Promise<Usuario> {
    const existente = await this.usuarioRepo.buscarPorCorreo(correo);
    if (existente) throw new Error('Ya existe un usuario con ese correo');

    const hash = await this.authService.hashear(passwordPlano);

    const nuevoUsuario = new Usuario(
      nombre,
      correo,
      hash,
      nivelLector,
      0,
      'lector',
      [],
      edad,
      generoSexual,
      generosFavoritos,
      objetivoLector,
      paginasDiarias,
      objetivoSemanal
    );

    return await this.usuarioRepo.crear(nuevoUsuario);
  }
}
