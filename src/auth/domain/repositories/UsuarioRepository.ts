import { Usuario } from '../entities/Usuario';
import { Email } from '../entities/Email';
import { Password } from '../entities/Password';
import { NivelLector } from '../entities/NivelLector';
import { GeneroSexual } from '../entities/GeneroSexual';

export interface UsuarioRepository {
  // Crear un nuevo usuario
  crear(usuario: Usuario): Promise<Usuario>;

  // Buscar usuario por correo (para login o validaciones)
  buscarPorCorreo(correo: Email): Promise<Usuario | null>;

  // Buscar usuario por ID (para obtener perfil, etc.)
  buscarPorId(id: number): Promise<Usuario | null>;

  // Actualizar datos completos del perfil del usuario
  actualizarPerfil(id: number, datos: Partial<{
    nombreUsuario: string;
    correo: Email;
    nivelLector: NivelLector;
    objetivoLector: string;
    edad: number;
    generosFavoritos: string[];
    generoSexual: GeneroSexual;
    paginasDiarias: number;
    objetivoSemanal: string;
  }>): Promise<void>;

  // Cambiar contraseña
  actualizarContrasena(id: number, nueva: Password): Promise<void>;

  // Actualizar historial de búsqueda
  actualizarHistorial(id: number, historial: string[]): Promise<void>;

  // 🔽 NUEVO: Listar todos los usuarios
  listarTodos(): Promise<Usuario[]>;
}
