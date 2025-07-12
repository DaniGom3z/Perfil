export class GeneroSexual {
  private readonly genero: string;

  constructor(genero: string) {
    if (!genero || genero.length < 3) {
      throw new Error('Género sexual inválido');
    }
    this.genero = genero;
  }

  get value(): string {
    return this.genero;
  }

  equals(otro: GeneroSexual): boolean {
    return this.genero === otro.genero;
  }
} 