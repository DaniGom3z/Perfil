"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(nombreUsuario, correo, contraseñaHash, nivelLector, puntuacionTotal = 0, rango = 'lector', historialBusquedas = [], edad, generoSexual, generosFavoritos = [], objetivoLector, paginasDiarias, objetivoSemanal, id // <--- AGREGA ESTE PARÁMETRO AQUÍ
    ) {
        this.nombreUsuario = nombreUsuario;
        this.correo = correo;
        this.contraseñaHash = contraseñaHash;
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
        if (!correo.includes('@')) {
            throw new Error('Correo electrónico inválido');
        }
        if (!contraseñaHash || contraseñaHash.length < 6) {
            throw new Error('La contraseña es muy corta');
        }
        if (!['principiante', 'intermedio', 'avanzado'].includes(nivelLector)) {
            throw new Error('Nivel lector inválido');
        }
        if (edad < 5 || edad > 120) {
            throw new Error('Edad inválida');
        }
        if (!generoSexual || generoSexual.length < 3) {
            throw new Error('Género sexual inválido');
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
}
exports.Usuario = Usuario;
