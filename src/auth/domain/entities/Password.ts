export class Password {
  private readonly hash: string;

  constructor(hash: string) {
    if (!hash || hash.length < 8) {
      throw new Error('La contraseña es muy corta');
    }
    this.hash = hash;
  }

  get value(): string {
    return this.hash;
  }

  equals(otro: Password): boolean {
    return this.hash === otro.hash;
  }
} 