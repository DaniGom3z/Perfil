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
    this.JWT_EXPIRACION = process.env.JWT_EXPIRACION || '1d'; // Por defecto: 1 día
  }

  // Hashea una contraseña en texto plano
  async hashear(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  // Compara contraseña en texto plano con la versión hasheada
  async comparar(passwordPlano: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(passwordPlano, passwordHash);
  }

  // Genera un JWT con un payload que contiene id y correo
  generarToken(payload: PayloadJWT): string {
    const opciones: SignOptions = {
      expiresIn: this.JWT_EXPIRACION,
    };
    return jwt.sign(payload, this.JWT_SECRET, opciones);
  }

  // Verifica un JWT y retorna el payload
  verificarToken(token: string): PayloadJWT {
    return jwt.verify(token, this.JWT_SECRET) as PayloadJWT;
  }
}
