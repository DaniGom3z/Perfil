export class ContrasenaCambiadaEvent {
  constructor(
    public readonly usuarioId: number,
    public readonly fechaCambio: Date
  ) {}
} 