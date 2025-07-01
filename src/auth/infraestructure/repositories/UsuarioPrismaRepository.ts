import { Usuario } from '../../domain/entities/Usuario';
import { UsuarioRepository } from '../../domain/repositories/UsuarioRepository';
import prisma from '../prisma/client';
import { HistorialBusqueda, GeneroFavorito } from '@prisma/client';

export class UsuarioPrismaRepository implements UsuarioRepository {
  async crear(usuario: Usuario): Promise<Usuario> {
    const creado = await prisma.usuario.create({
      data: {
        nombreUsuario: usuario.nombreUsuario,
        correo: usuario.correo,
        contraseñaHash: usuario.contraseñaHash,
        nivelLector: usuario.nivelLector,
        puntuacionTotal: usuario.puntuacionTotal,
        rango: usuario.rango,
        edad: usuario.edad,
        generoSexual: usuario.generoSexual,
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
      creado.correo,
      creado.contraseñaHash,
      creado.nivelLector as 'principiante' | 'intermedio' | 'avanzado',
      creado.puntuacionTotal,
      creado.rango,
      creado.historialBusquedas.map((h: HistorialBusqueda) => h.termino),
      creado.edad,
      creado.generoSexual,
      creado.generosFavoritos.map((g: GeneroFavorito) => g.genero),
      creado.objetivoLector,
      creado.paginasDiarias,
      creado.objetivoSemanal,
      creado.id 
    );
  }

  async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    const usuarioDb = await prisma.usuario.findUnique({
      where: { correo },
      include: {
        historialBusquedas: true,
        generosFavoritos: true,
      },
    });

    if (!usuarioDb) return null;

    return new Usuario(
      usuarioDb.nombreUsuario,
      usuarioDb.correo,
      usuarioDb.contraseñaHash,
      usuarioDb.nivelLector as 'principiante' | 'intermedio' | 'avanzado',
      usuarioDb.puntuacionTotal,
      usuarioDb.rango,
      usuarioDb.historialBusquedas.map((h: HistorialBusqueda) => h.termino),
      usuarioDb.edad,
      usuarioDb.generoSexual,
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
      usuarioDb.correo,
      usuarioDb.contraseñaHash,
      usuarioDb.nivelLector as 'principiante' | 'intermedio' | 'avanzado',
      usuarioDb.puntuacionTotal,
      usuarioDb.rango,
      usuarioDb.historialBusquedas.map((h: HistorialBusqueda) => h.termino),
      usuarioDb.edad,
      usuarioDb.generoSexual,
      usuarioDb.generosFavoritos.map((g: GeneroFavorito) => g.genero),
      usuarioDb.objetivoLector,
      usuarioDb.paginasDiarias,
      usuarioDb.objetivoSemanal
    );
  }

  async actualizarPerfil(
    id: number,
    datos: Partial<{
      nombreUsuario: string;
      correo: string;
      nivelLector: 'principiante' | 'intermedio' | 'avanzado';
      objetivoLector: string;
      edad: number;
      generosFavoritos: string[];
      generoSexual: string;
      paginasDiarias: number;
      objetivoSemanal: string;
    }>
  ): Promise<void> {
    const { generosFavoritos, ...restoDatos } = datos;

    await prisma.$transaction([
      prisma.usuario.update({
        where: { id },
        data: restoDatos,
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

  async actualizarContrasena(id: number, nuevaHash: string): Promise<void> {
    await prisma.usuario.update({
      where: { id },
      data: { contraseñaHash: nuevaHash },
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
}
