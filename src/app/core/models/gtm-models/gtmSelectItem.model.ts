
export class GTMSelectItem {
  /**
 * Clase que representa un elemento seleccionable en GTM.
 *
 * @param event - El evento asociado al elemento seleccionable.
 * @param ParameterTarget - El objetivo del parámetro.
 * @param ParameterLocation - La ubicación del parámetro.
 * @param ParameterType - El tipo del parámetro.
 * @param ParameterCategory - La categoría del parámetro.
 * @param IDAccount - El ID de la cuenta.
 * @param UserName - El nombre de usuario.
 * @param IDProgram - El ID del programa.
 * @param IDPerson - El ID de la persona.
 * @param item - El elemento seleccionable.
 */
  constructor(
    public event: string,
    public ParameterTarget: string,
    public ParameterLocation: string,
    public ParameterType: string,
    public ParameterCategory: string,
    public IDAccount: number,
    public UserName: string,
    public IDProgram: number,
    public IDPerson: number,
    public item: string
  ) { }
}


export class GTMItemOfSelectItem {
  /**
 * Modelo para un elemento de selección en GTM.
 *
 * @param Catalogo - El número del catálogo.
 * @param Categoria - La categoría del elemento.
 * @param IDCategoria - El ID de la categoría.
 * @param Id - El ID del elemento.
 * @param Nombre - El nombre del elemento.
 * @param Precio - El precio del elemento.
 * @param Referencia - La referencia del elemento.
 */
  constructor(
    public Catalogo: number,
    public Categoria: string,
    public IDCategoria: number,
    public Id: number,
    public Nombre: string,
    public Precio: number,
    public Referencia: string
  ) { }
}
