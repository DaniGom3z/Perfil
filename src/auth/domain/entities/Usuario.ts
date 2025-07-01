export class Usuario {
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(
    public readonly nombreUsuario: string,
    public readonly correo: string,
    public readonly contraseñaHash: string,
    public nivelLector: 'principiante' | 'intermedio' | 'avanzado',
    public puntuacionTotal: number = 0,
    public rango: string = 'lector',
    public historialBusquedas: string[] = [],
    public edad: number,
    public generoSexual: string,
    public generosFavoritos: string[] = [],
    public objetivoLector: string,
    public paginasDiarias: number,
    public objetivoSemanal: string,
    public readonly id?: number // <--- AGREGA ESTE PARÁMETRO AQUÍ
  ) {
    // Validaciones
    if (!nombreUsuario || nombreUsuario.trim().length < 3) {
      throw new Error('El nombre de usuario debe tener al menos 3 caracteres');
    }
    if (!correo.includes('@')) {
      throw new Error('Correo electrónico inválido');
    }
    if (!contraseñaHash || contraseñaHash.length < 6) {
      throw new Error('La contraseña es muy corta');
    }
    if (!['principiante', 'intermedio', 'avanzado'].includes(nivelLector)) {
      throw new Error('Nivel lector inválido');
    }
    if (edad < 5 || edad > 120) {
      throw new Error('Edad inválida');
    }
    if (!generoSexual || generoSexual.length < 3) {
      throw new Error('Género sexual inválido');
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
}
