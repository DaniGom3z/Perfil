import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';

interface PayloadJWT {
  id: number;
  correo: string;
}

export class AuthService {
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRACION: string;

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET || 'secret_desarrollo';
    this.JWT_EXPIRACION = process.env.JWT_EXPIRACION || '1d'; 
  }

  async hashear(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparar(passwordPlano: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(passwordPlano, passwordHash);
  }

  generarToken(payload: PayloadJWT): string {
    const opciones: SignOptions = {
      expiresIn: this.JWT_EXPIRACION,
      subject: String(payload.id),
      algorithm: 'HS256' 
    };
    return jwt.sign(
      {id: payload.id, correo: payload.correo}, 
      this.JWT_SECRET, 
      opciones
    );
  }

  verificarToken(token: string): PayloadJWT {
    return jwt.verify(token, this.JWT_SECRET) as PayloadJWT;
  }
}
