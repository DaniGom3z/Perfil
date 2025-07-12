export class NivelLector {
  private readonly nivel: 'principiante' | 'intermedio' | 'avanzado';

  constructor(nivel: string) {
    if (!['principiante', 'intermedio', 'avanzado'].includes(nivel)) {
      throw new Error('Nivel lector inválido');
    }
    this.nivel = nivel as 'principiante' | 'intermedio' | 'avanzado';
  }

  get value(): 'principiante' | 'intermedio' | 'avanzado' {
    return this.nivel;
  }

  equals(otro: NivelLector): boolean {
    return this.nivel === otro.nivel;
  }
} 