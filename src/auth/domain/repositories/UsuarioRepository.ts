import { Usuario } from '../entities/Usuario';

export interface UsuarioRepository {
  // Crear un nuevo usuario
  crear(usuario: Usuario): Promise<Usuario>;

  // Buscar usuario por correo (para login o validaciones)
  buscarPorCorreo(correo: string): Promise<Usuario | null>;

  // Buscar usuario por ID (para obtener perfil, etc.)
  buscarPorId(id: number): Promise<Usuario | null>;

  // Actualizar datos completos del perfil del usuario
  actualizarPerfil(id: number, datos: Partial<{
    nombreUsuario: string;
    correo: string;
    nivelLector: 'principiante' | 'intermedio' | 'avanzado';
    objetivo: string;
    edad: number;
    generosFavoritos: string[];
    generoSexual: string;
    paginasDiarias: number;
    objetivoSemanal: string;
  }>): Promise<void>;

  // Cambiar contraseña
  actualizarContrasena(id: number, nuevaHash: string): Promise<void>;

  // Actualizar historial de búsqueda
  actualizarHistorial(id: number, historial: string[]): Promise<void>;
}
