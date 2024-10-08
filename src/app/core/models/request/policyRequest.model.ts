
export class PolicyAcceptanceRequestModel {
  /**
 * Modelo de solicitud de aceptación de políticas.
 *
 * @param AcceptTermsAndConditions - Indica si se aceptan los términos y condiciones.
 * @param AcceptHabeasData - Indica si se acepta el tratamiento de datos personales.
 */
  constructor(
    public AcceptTermsAndConditions: boolean,
    public AcceptHabeasData: boolean,
  ) { }
}
