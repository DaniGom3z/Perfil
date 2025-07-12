import { UsuarioRepository } from '../../domain/repositories/UsuarioRepository';
import { Email } from '../../domain/entities/Email';
import { NivelLector } from '../../domain/entities/NivelLector';
import { GeneroSexual } from '../../domain/entities/GeneroSexual';

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
    const datosVO: any = { ...datos };
    if (datos.correo) datosVO.correo = new Email(datos.correo);
    if (datos.nivelLector) datosVO.nivelLector = new NivelLector(datos.nivelLector);
    if (datos.generoSexual) datosVO.generoSexual = new GeneroSexual(datos.generoSexual);
    await this.usuarioRepo.actualizarPerfil(idUsuario, datosVO);
  }
}
