export class Email {
  private readonly valor: string;

  constructor(valor: string) {
    if (!valor || !Email.validar(valor)) {
      throw new Error('Correo electrónico inválido');
    }
    this.valor = valor;
  }

  static validar(valor: string): boolean {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(valor);
  }

  get value(): string {
    return this.valor;
  }

  equals(otro: Email): boolean {
    return this.valor === otro.valor;
  }
} 