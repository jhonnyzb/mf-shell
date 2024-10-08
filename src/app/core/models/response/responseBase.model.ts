
export class ResponseBaseModel<T> {
  /**
 * Clase que representa el modelo base de una respuesta.
 *
 * @template T - Tipo de datos contenidos en la respuesta.
 */
  constructor(
    public codeId: number,
    public message: string,
    public data: T) { }
}
