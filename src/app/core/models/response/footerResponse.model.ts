
export class FooterResponseModel {
  /**
 * Modelo de respuesta para el pie de página.
 *
 * @param {FooterProgramsModel} FooterPrograms - Los programas del pie de página.
 */
  constructor(
    public FooterPrograms: FooterProgramsModel
  ) { }
}

export class FooterProgramsModel {
  /**
 * Modelo de respuesta para el pie de página.
 *
 * @param FooterId - El ID del pie de página.
 * @param ProgramId - El ID del programa.
 * @param TermsAndConditions - Los términos y condiciones.
 * @param TermsName - El nombre de los términos y condiciones.
 * @param DataProcessingPolicy - La política de procesamiento de datos.
 * @param DataPName - El nombre de la política de procesamiento de datos.
 * @param Faq - Las preguntas frecuentes.
 * @param FaqName - El nombre de las preguntas frecuentes.
 * @param Email - El correo electrónico.
 * @param Phone - El número de teléfono.
 * @param Copyright - Los derechos de autor.
 */
  constructor(
    public FooterId: number,
    public ProgramId: number,
    public TermsAndConditions: string,
    public TermsName: string,
    public DataProcessingPolicy: string,
    public DataPName: string,
    public Faq: string,
    public FaqName: string,
    public Email: string,
    public Phone: string,
    public Copyright: string
  ) { }
}
