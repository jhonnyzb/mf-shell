/**
 * Interfaz que representa un DTO de segmento.
 *
 * @param clusterId - El ID del clúster al que pertenece el segmento.
 * @param name - El nombre del segmento.
 */
export interface SegmentDto {
  clusterId: number;
  name: string;
}
