import { Email } from './Email';
import { Password } from './Password';
import { NivelLector } from './NivelLector';
import { GeneroSexual } from './GeneroSexual';

export class Usuario {
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(
    public readonly nombreUsuario: string,
    public readonly correo: Email,
    public contrasena: Password,
    public nivelLector: NivelLector,
    public puntuacionTotal: number = 0,
    public rango: string = 'lector',
    public historialBusquedas: string[] = [],
    public edad: number,
    public generoSexual: GeneroSexual,
    public generosFavoritos: string[] = [],
    public objetivoLector: string,
    public paginasDiarias: number,
    public objetivoSemanal: string,
    public readonly id?: number
  ) {
    // Validaciones
    if (!nombreUsuario || nombreUsuario.trim().length < 3) {
      throw new Error('El nombre de usuario debe tener al menos 3 caracteres');
    }
    if (!(correo instanceof Email)) {
      throw new Error('Correo debe ser un Email válido');
    }
    if (!(contrasena instanceof Password)) {
      throw new Error('Contraseña debe ser un Password válido');
    }
    if (!(nivelLector instanceof NivelLector)) {
      throw new Error('Nivel lector debe ser un NivelLector válido');
    }
    if (edad < 5 || edad > 120) {
      throw new Error('Edad inválida');
    }
    if (!(generoSexual instanceof GeneroSexual)) {
      throw new Error('Género sexual debe ser un GeneroSexual válido');
    }
    if (!Array.isArray(generosFavoritos)) {
      throw new Error('Géneros favoritos inválidos');
    }
    if (!objetivoLector) {
      throw new Error('Objetivo lector es requerido');
    }
    if (paginasDiarias <= 0) {
      throw new Error('Páginas diarias debe ser mayor a 0');
    }
    if (!objetivoSemanal) {
      throw new Error('Objetivo semanal es requerido');
    }
  }

  cambiarContraseña(nueva: Password) {
    if (!(nueva instanceof Password)) {
      throw new Error('La nueva contraseña debe ser un Password válido');
    }
    this.contrasena = nueva;
  }

  actualizarPerfil(datos: Partial<{
    nombreUsuario: string;
    correo: Email;
    nivelLector: NivelLector;
    objetivoLector: string;
    edad: number;
    generosFavoritos: string[];
    generoSexual: GeneroSexual;
    paginasDiarias: number;
    objetivoSemanal: string;
  }>) {
    if (datos.nombreUsuario) {
      if (datos.nombreUsuario.trim().length < 3) throw new Error('El nombre de usuario debe tener al menos 3 caracteres');
      (this as any).nombreUsuario = datos.nombreUsuario;
    }
    if (datos.correo) (this as any).correo = datos.correo;
    if (datos.nivelLector) (this as any).nivelLector = datos.nivelLector;
    if (datos.objetivoLector) (this as any).objetivoLector = datos.objetivoLector;
    if (datos.edad) (this as any).edad = datos.edad;
    if (datos.generosFavoritos) (this as any).generosFavoritos = datos.generosFavoritos;
    if (datos.generoSexual) (this as any).generoSexual = datos.generoSexual;
    if (datos.paginasDiarias) (this as any).paginasDiarias = datos.paginasDiarias;
    if (datos.objetivoSemanal) (this as any).objetivoSemanal = datos.objetivoSemanal;
  }

  sumarPuntuacion(puntos: number) {
    if (puntos <= 0) throw new Error('Los puntos deben ser positivos');
    this.puntuacionTotal += puntos;
  }

  cambiarNivelLector(nuevoNivel: NivelLector) {
    if (!(nuevoNivel instanceof NivelLector)) throw new Error('Nivel lector inválido');
    (this as any).nivelLector = nuevoNivel;
  }
}
