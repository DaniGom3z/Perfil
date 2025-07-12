import { UsuarioRepository } from '../../domain/repositories/UsuarioRepository';
import { Usuario } from '../../domain/entities/Usuario';
import { AuthService } from '../../domain/services/AuthService';
import { EventPublisher } from '../../domain/events/EventPublisher';
import { Email } from '../../domain/entities/Email';
import { Password } from '../../domain/entities/Password';
import { NivelLector } from '../../domain/entities/NivelLector';
import { GeneroSexual } from '../../domain/entities/GeneroSexual';


export class RegistrarUsuario {
  constructor(
    private readonly usuarioRepo: UsuarioRepository,
    private readonly authService: AuthService,
    private readonly publisher: EventPublisher

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
    let emailVO: Email;
    try {
      emailVO = new Email(correo);
    } catch (e) {
      throw new Error('Correo electrónico inválido');
    }

    const existente = await this.usuarioRepo.buscarPorCorreo(emailVO);
    if (existente) throw new Error('Ya existe un usuario con ese correo');

    let passwordVO: Password;
    let nivelLectorVO: NivelLector;
    let generoSexualVO: GeneroSexual;
    try {
      const hash = await this.authService.hashear(passwordPlano);
      passwordVO = new Password(hash);
      nivelLectorVO = new NivelLector(nivelLector);
      generoSexualVO = new GeneroSexual(generoSexual);
    } catch (e) {
      throw new Error('Datos de usuario inválidos: ' + (e instanceof Error ? e.message : 'Error desconocido'));
    }

    const nuevoUsuario = new Usuario(
      nombre,
      emailVO,
      passwordVO,
      nivelLectorVO,
      0,
      'lector',
      [],
      edad,
      generoSexualVO,
      generosFavoritos,
      objetivoLector,
      paginasDiarias,
      objetivoSemanal
    );

    const creado = await this.usuarioRepo.crear(nuevoUsuario);

    // Emitir evento
    await this.publisher.publish('usuario.registrado', {
      idUsuario: creado.id,
      correo: creado.correo.value,
      fechaRegistro: new Date()
    });

    return creado;
  }
}
