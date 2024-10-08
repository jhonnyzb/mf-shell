
export class ResponseBaseModel<T> {
  /**
 * Clase que representa el modelo base de una respuesta.
 * @template T - Tipo de dato de la propiedad 'data'.
 */
  constructor(
    public codeId: number,
    public message: string,
    public data: T) { }
}
