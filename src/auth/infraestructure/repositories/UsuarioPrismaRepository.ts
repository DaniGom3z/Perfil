import { Usuario } from '../../domain/entities/Usuario';
import { UsuarioRepository } from '../../domain/repositories/UsuarioRepository';
import prisma from '../prisma/client';
import { HistorialBusqueda, GeneroFavorito } from '@prisma/client';
import { Email } from '../../domain/entities/Email';
import { Password } from '../../domain/entities/Password';
import { NivelLector } from '../../domain/entities/NivelLector';
import { GeneroSexual } from '../../domain/entities/GeneroSexual';

export class UsuarioPrismaRepository implements UsuarioRepository {
  async crear(usuario: Usuario): Promise<Usuario> {
    const creado = await prisma.usuario.create({
      data: {
        nombreUsuario: usuario.nombreUsuario,
        correo: usuario.correo.value,
        contraseñaHash: usuario.contrasena.value,
        nivelLector: usuario.nivelLector.value,
        puntuacionTotal: usuario.puntuacionTotal,
        rango: usuario.rango,
        edad: usuario.edad,
        generoSexual: usuario.generoSexual.value,
        objetivoLector: usuario.objetivoLector,
        paginasDiarias: usuario.paginasDiarias,
        objetivoSemanal: usuario.objetivoSemanal,
        historialBusquedas: {
          create: usuario.historialBusquedas.map((termino: string) => ({ termino })),
        },
        generosFavoritos: {
          create: usuario.generosFavoritos.map((genero: string) => ({ genero })),
        },
      },
      include: {
        historialBusquedas: true,
        generosFavoritos: true,
      },
    });

    return new Usuario(
      creado.nombreUsuario,
      new Email(creado.correo),
      new Password(creado.contraseñaHash),
      new NivelLector(creado.nivelLector),
      creado.puntuacionTotal,
      creado.rango,
      creado.historialBusquedas.map((h: HistorialBusqueda) => h.termino),
      creado.edad,
      new GeneroSexual(creado.generoSexual),
      creado.generosFavoritos.map((g: GeneroFavorito) => g.genero),
      creado.objetivoLector,
      creado.paginasDiarias,
      creado.objetivoSemanal,
      creado.id
    );
  }

  async buscarPorCorreo(correo: Email): Promise<Usuario | null> {
    const usuarioDb = await prisma.usuario.findUnique({
      where: { correo: correo.value },
      include: {
        historialBusquedas: true,
        generosFavoritos: true,
      },
    });

    if (!usuarioDb) return null;

    return new Usuario(
      usuarioDb.nombreUsuario,
      new Email(usuarioDb.correo),
      new Password(usuarioDb.contraseñaHash),
      new NivelLector(usuarioDb.nivelLector),
      usuarioDb.puntuacionTotal,
      usuarioDb.rango,
      usuarioDb.historialBusquedas.map((h: HistorialBusqueda) => h.termino),
      usuarioDb.edad,
      new GeneroSexual(usuarioDb.generoSexual),
      usuarioDb.generosFavoritos.map((g: GeneroFavorito) => g.genero),
      usuarioDb.objetivoLector,
      usuarioDb.paginasDiarias,
      usuarioDb.objetivoSemanal,
      usuarioDb.id
    );
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    const usuarioDb = await prisma.usuario.findUnique({
      where: { id },
      include: {
        historialBusquedas: true,
        generosFavoritos: true,
      },
    });

    if (!usuarioDb) return null;

    return new Usuario(
      usuarioDb.nombreUsuario,
      new Email(usuarioDb.correo),
      new Password(usuarioDb.contraseñaHash),
      new NivelLector(usuarioDb.nivelLector),
      usuarioDb.puntuacionTotal,
      usuarioDb.rango,
      usuarioDb.historialBusquedas.map((h: HistorialBusqueda) => h.termino),
      usuarioDb.edad,
      new GeneroSexual(usuarioDb.generoSexual),
      usuarioDb.generosFavoritos.map((g: GeneroFavorito) => g.genero),
      usuarioDb.objetivoLector,
      usuarioDb.paginasDiarias,
      usuarioDb.objetivoSemanal,
      usuarioDb.id
    );
  }

  async actualizarPerfil(
    id: number,
    datos: Partial<{
      nombreUsuario: string;
      correo: Email;
      nivelLector: NivelLector;
      objetivoLector: string;
      edad: number;
      generosFavoritos: string[];
      generoSexual: GeneroSexual;
      paginasDiarias: number;
      objetivoSemanal: string;
    }>
  ): Promise<void> {
    const { generosFavoritos, correo, nivelLector, generoSexual, ...restoDatos } = datos;
    await prisma.$transaction([
      prisma.usuario.update({
        where: { id },
        data: {
          ...restoDatos,
          ...(correo ? { correo: correo.value } : {}),
          ...(nivelLector ? { nivelLector: nivelLector.value } : {}),
          ...(generoSexual ? { generoSexual: generoSexual.value } : {}),
        },
      }),
      ...(generosFavoritos
        ? [
            prisma.generoFavorito.deleteMany({ where: { usuarioId: id } }),
            prisma.generoFavorito.createMany({
              data: generosFavoritos.map((g: string) => ({ genero: g, usuarioId: id })),
            }),
          ]
        : []),
    ]);
  }

  async actualizarContrasena(id: number, nueva: Password): Promise<void> {
    await prisma.usuario.update({
      where: { id },
      data: { contraseñaHash: nueva.value },
    });
  }

  async actualizarHistorial(id: number, historial: string[]): Promise<void> {
    await prisma.$transaction([
      prisma.historialBusqueda.deleteMany({ where: { usuarioId: id } }),
      prisma.historialBusqueda.createMany({
        data: historial.map((h: string) => ({ termino: h, usuarioId: id })),
      }),
    ]);
  }


   async listarTodos(): Promise<Usuario[]> {
    const usuariosDb = await prisma.usuario.findMany({
      include: {
        historialBusquedas: true,
        generosFavoritos: true,
      },
    });

    return usuariosDb.map((usuarioDb) => new Usuario(
      usuarioDb.nombreUsuario,
      new Email(usuarioDb.correo),
      new Password(usuarioDb.contraseñaHash),
      new NivelLector(usuarioDb.nivelLector),
      usuarioDb.puntuacionTotal,
      usuarioDb.rango,
      usuarioDb.historialBusquedas.map((h: HistorialBusqueda) => h.termino),
      usuarioDb.edad,
      new GeneroSexual(usuarioDb.generoSexual),
      usuarioDb.generosFavoritos.map((g: GeneroFavorito) => g.genero),
      usuarioDb.objetivoLector,
      usuarioDb.paginasDiarias,
      usuarioDb.objetivoSemanal,
      usuarioDb.id
    ));
  }
}
