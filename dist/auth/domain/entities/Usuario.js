"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const Email_1 = require("./Email");
const Password_1 = require("./Password");
const NivelLector_1 = require("./NivelLector");
const GeneroSexual_1 = require("./GeneroSexual");
class Usuario {
    constructor(nombreUsuario, correo, contrasena, nivelLector, puntuacionTotal = 0, rango = 'lector', historialBusquedas = [], edad, generoSexual, generosFavoritos = [], objetivoLector, paginasDiarias, objetivoSemanal, id) {
        this.nombreUsuario = nombreUsuario;
        this.correo = correo;
        this.contrasena = contrasena;
        this.nivelLector = nivelLector;
        this.puntuacionTotal = puntuacionTotal;
        this.rango = rango;
        this.historialBusquedas = historialBusquedas;
        this.edad = edad;
        this.generoSexual = generoSexual;
        this.generosFavoritos = generosFavoritos;
        this.objetivoLector = objetivoLector;
        this.paginasDiarias = paginasDiarias;
        this.objetivoSemanal = objetivoSemanal;
        this.id = id;
        // Validaciones
        if (!nombreUsuario || nombreUsuario.trim().length < 3) {
            throw new Error('El nombre de usuario debe tener al menos 3 caracteres');
        }
        if (!(correo instanceof Email_1.Email)) {
            throw new Error('Correo debe ser un Email válido');
        }
        if (!(contrasena instanceof Password_1.Password)) {
            throw new Error('Contraseña debe ser un Password válido');
        }
        if (!(nivelLector instanceof NivelLector_1.NivelLector)) {
            throw new Error('Nivel lector debe ser un NivelLector válido');
        }
        if (edad < 5 || edad > 120) {
            throw new Error('Edad inválida');
        }
        if (!(generoSexual instanceof GeneroSexual_1.GeneroSexual)) {
            throw new Error('Género sexual debe ser un GeneroSexual válido');
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
    cambiarContraseña(nueva) {
        if (!(nueva instanceof Password_1.Password)) {
            throw new Error('La nueva contraseña debe ser un Password válido');
        }
        this.contrasena = nueva;
    }
    actualizarPerfil(datos) {
        if (datos.nombreUsuario) {
            if (datos.nombreUsuario.trim().length < 3)
                throw new Error('El nombre de usuario debe tener al menos 3 caracteres');
            this.nombreUsuario = datos.nombreUsuario;
        }
        if (datos.correo)
            this.correo = datos.correo;
        if (datos.nivelLector)
            this.nivelLector = datos.nivelLector;
        if (datos.objetivoLector)
            this.objetivoLector = datos.objetivoLector;
        if (datos.edad)
            this.edad = datos.edad;
        if (datos.generosFavoritos)
            this.generosFavoritos = datos.generosFavoritos;
        if (datos.generoSexual)
            this.generoSexual = datos.generoSexual;
        if (datos.paginasDiarias)
            this.paginasDiarias = datos.paginasDiarias;
        if (datos.objetivoSemanal)
            this.objetivoSemanal = datos.objetivoSemanal;
    }
    sumarPuntuacion(puntos) {
        if (puntos <= 0)
            throw new Error('Los puntos deben ser positivos');
        this.puntuacionTotal += puntos;
    }
    cambiarNivelLector(nuevoNivel) {
        if (!(nuevoNivel instanceof NivelLector_1.NivelLector))
            throw new Error('Nivel lector inválido');
        this.nivelLector = nuevoNivel;
    }
}
exports.Usuario = Usuario;
