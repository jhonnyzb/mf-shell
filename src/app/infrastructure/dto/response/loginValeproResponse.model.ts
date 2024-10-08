
export class LoginValeproResponseModel {
  /**
 * Modelo de respuesta para el inicio de sesión en Valepro.
 *
 * @param {string} UserId - ID del usuario.
 * @param {string} UserName - Nombre de usuario.
 * @param {string} AccessToken - Token de acceso.
 * @param {string} Name - Nombre del usuario.
 * @param {string} LastName - Apellido del usuario.
 * @param {string} FullName - Nombre completo del usuario.
 * @param {string} Email - Correo electrónico del usuario.
 * @param {string} Phone - Número de teléfono del usuario.
 * @param {string} HiddenEmail - Correo electrónico oculto del usuario.
 * @param {string} HiddenPhone - Número de teléfono oculto del usuario.
 * @param {number} PersonId - ID de la persona.
 * @param {string} SessionId - ID de la sesión.
 * @param {number} ProgramId - ID del programa.
 * @param {number} AccountId - ID de la cuenta.
 * @param {string} ProgramName - Nombre del programa.
 * @param {number} LanguageId - ID del idioma.
 * @param {boolean} RequiredNewPassword - Indica si se requiere una nueva contraseña.
 * @param {RoleModel[]} Roles - Lista de roles del usuario.
 * @param {boolean} AcceptHabeasData - Indica si se acepta la política de protección de datos.
 * @param {boolean} AcceptTermsAndConditions - Indica si se aceptan los términos y condiciones.
 */
  constructor(
    public UserId: string,
    public UserName: string,
    public AccessToken: string,
    public Name: string,
    public LastName: string,
    public FullName: string,
    public Email: string,
    public Phone: string,
    public HiddenEmail: string,
    public HiddenPhone: string,
    public PersonId: number,
    public SessionId: string,
    public ProgramId: number,
    public AccountId: number,
    public ProgramName: string,
    public LanguageId: number,
    public RequiredNewPassword: boolean,
    public Roles: RoleModel[],
    public AcceptHabeasData: boolean,
    public AcceptTermsAndConditions: boolean
  ) { }
}



export class RoleModel {
  /**
 * Clase que representa un modelo de rol.
 *
 * @param RoleId - El ID del rol.
 * @param RoleName - El nombre del rol.
 */
  constructor(
    public RoleId: number,
    public RoleName: string
  ) { }
}



