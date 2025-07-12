export class UsuarioRegistradoEvent {
  constructor(
    public readonly usuarioId: number,
    public readonly correo: string,
    public readonly fechaRegistro: Date
  ) {}
}
