"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const usuario_routes_1 = __importDefault(require("./auth/infraestructure/adapters/routes/usuario.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/usuarios', usuario_routes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
