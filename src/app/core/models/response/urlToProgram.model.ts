
export class UrlToProgramModel {
  /**
 * Modelo para la URL de un programa.
 *
 * @param ProgramId - El ID del programa.
 * @param LookAndFeel - El modelo de apariencia visual.
 * @param Name - El nombre del programa.
 * @param PasswordMinLength - La longitud mínima de la contraseña.
 * @param CanRegisterOnWebResponsive - Indica si se puede registrar en la versión web responsive.
 * @param TagManagerWebGestor - El gestor de etiquetas para la versión web.
 * @param TagManagerWebResponsive - El gestor de etiquetas para la versión web responsive.
 * @param Copyright - Los derechos de autor.
 */
  constructor(
    public ProgramId: number,
    public LookAndFeel: LookAndFeelModel,
    public Name: string,
    public PasswordMinLength: number,
    public CanRegisterOnWebResponsive: boolean,
    public TagManagerWebGestor: string,
    public TagManagerWebResponsive: string,
    public Copyright: string
  ) { }
}


export class LookAndFeelModel {
  /**
 * Modelo de apariencia visual.
 *
 * @param LookAndFeelId - El ID de la apariencia visual.
 * @param ImageBackgroundLogin - La imagen de fondo para el inicio de sesión.
 * @param BigImageBackgroundLogin - La imagen grande de fondo para el inicio de sesión.
 * @param UseBigBackground - Indica si se utiliza una imagen grande de fondo.
 * @param PrimaryColor - El color primario.
 * @param SecondaryColor - El color secundario.
 * @param TertiaryColor - El color terciario.
 * @param backgroundColor - El color de fondo.
 * @param FontFamilyName - El nombre de la familia de fuentes.
 * @param Icon - El ícono.
 */
  constructor(
    public LookAndFeelId: number,
    public ImageBackgroundLogin: string,
    public BigImageBackgroundLogin: string,
    public UseBigBackground: boolean,
    public PrimaryColor: string,
    public SecondaryColor: string,
    public TertiaryColor: string,
    public backgroundColor: string,
    public FontFamilyName: string,
    public Icon: string
  ) { }
}
