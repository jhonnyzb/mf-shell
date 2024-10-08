
export class PolicyAcceptanceRequestDto {
  /**
 * Clase que representa una solicitud de aceptación de políticas.
 *
 * @param acceptTermsAndConditions - Indica si se aceptan los términos y condiciones.
 * @param acceptHabeasData - Indica si se acepta el tratamiento de datos personales.
 */
  constructor(
    public acceptTermsAndConditions: boolean,
    public acceptHabeasData: boolean,
  ) { }
}
