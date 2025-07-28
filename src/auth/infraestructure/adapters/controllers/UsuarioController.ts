import { Request, Response } from 'express';
import { RegistrarUsuario } from '../../../application/usecases/RegistrarUsuario';
import { IniciarSesion } from '../../../application/usecases/IniciarSesion';
import { ActualizarPerfil } from '../../../application/usecases/ActualizarPerfil';
import { CambiarContrasena } from '../../../application/usecases/CambiarContrasena';
import { ObtenerPerfil } from '../../../application/usecases/ObtenerPerfil';
import { ObtenerUsuarios } from '../../../application/usecases/ObtenerUsuarios';

export class UsuarioController {
  constructor(
    private readonly registrarUsuario: RegistrarUsuario,
    private readonly iniciarSesion: IniciarSesion,
    private readonly actualizarPerfil: ActualizarPerfil,
    private readonly cambiarContrasena: CambiarContrasena,
    private readonly obtenerPerfil: ObtenerPerfil,
    private readonly obtenerUsuarios: ObtenerUsuarios
  ) {}

  async registro(req: Request, res: Response): Promise<void> {
    try {
      const {
        nombreUsuario,
        correo,
        contraseña,
        edad,
        generoSexual,
        generosFavoritos,
        nivelLector,
        objetivoLector,
        paginasDiarias,
        objetivoSemanal,
      } = req.body;

      const usuario = await this.registrarUsuario.execute(
        nombreUsuario,
        correo,
        contraseña,
        edad,
        generoSexual,
        generosFavoritos,
        nivelLector,
        objetivoLector,
        paginasDiarias,
        objetivoSemanal
      );

      res.status(201).json({ message: 'Usuario registrado con éxito', usuario });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { correo, contraseña } = req.body;

      const { token } = await this.iniciarSesion.execute(correo, contraseña);
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async perfil(req: Request, res: Response): Promise<void> {
    try {
      const idUsuario = Number(req.params.id);
      const usuario = await this.obtenerPerfil.execute(idUsuario);

      res.status(200).json(usuario);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async actualizar(req: Request, res: Response): Promise<void> {
    try {
      const idUsuario = Number(req.params.id);
      const datos = req.body;

      await this.actualizarPerfil.execute(idUsuario, datos);
      res.status(200).json({ message: 'Perfil actualizado' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async cambiarPassword(req: Request, res: Response): Promise<void> {
    try {
      const idUsuario = Number(req.params.id);
      const { contraseñaActual, nuevaContraseña } = req.body;

      await this.cambiarContrasena.execute(idUsuario, contraseñaActual, nuevaContraseña);
      res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async listarUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await this.obtenerUsuarios.execute();
      res.status(200).json(usuarios);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
