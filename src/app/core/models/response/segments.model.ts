
export class SegmentModel {
  /**
 * Clase que representa un modelo de segmento.
 *
 * @param clusterId - El ID del clúster al que pertenece el segmento.
 * @param name - El nombre del segmento.
 */
  constructor(
    public clusterId: number,
    public name: string) { }
}
