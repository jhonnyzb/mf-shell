
export class GTMSelectContent {
  /**
 * Clase que representa el modelo GTMSelectContent.
 *
 * @param event - El evento asociado al contenido seleccionado.
 * @param ParameterTarget - El objetivo del parámetro.
 * @param ParameterType - El tipo del parámetro.
 * @param ParameterCategory - La categoría del parámetro.
 * @param IDAccount - El ID de la cuenta.
 * @param UserName - El nombre de usuario.
 * @param IDProgram - El ID del programa.
 * @param IDPerson - El ID de la persona.
 * @param ParameterText - El texto del parámetro.
 * @param ParameterItemID - El ID del ítem del parámetro.
 */
  constructor(
    public event: string,
    public ParameterTarget: string,
    public ParameterType: string,
    public ParameterCategory: string,
    public IDAccount: number,
    public UserName: string,
    public IDProgram: number,
    public IDPerson: number,
    public ParameterText: string,
    public ParameterItemID: string
  ) { }
}
