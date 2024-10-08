/**
 * Interfaz que representa los datos de respuesta de la URL a un programa.
 *
 * @param programId - El ID del programa.
 * @param name - El nombre del programa.
 * @param passwordMinLength - La longitud mínima de la contraseña.
 * @param canRegisterOnWebResponsive - Indica si se puede registrar en la web responsive.
 * @param tagManagerWebGestor - El gestor de etiquetas para la web gestor.
 * @param tagManagerWebResponsive - El gestor de etiquetas para la web responsive.
 * @param copyright - Los derechos de autor.
 * @param lookAndFeel - Los datos de apariencia visual.
 */
export interface UrlToProgramDto {
  programId: number;
  name: string;
  passwordMinLength: number;
  canRegisterOnWebResponsive: boolean;
  tagManagerWebGestor: string | null;
  tagManagerWebResponsive: string;
  copyright: string;
  lookAndFeel: LookAndFeelDto;
}

/**
 * Interfaz que representa los datos de apariencia visual.
 * @param lookAndFeelId - El ID de la apariencia visual.
 * @param imageBackgroundLogin - La imagen de fondo para el inicio de sesión.
 * @param bigImageBackgroundLogin - La imagen grande de fondo para el inicio de sesión.
 * @param useBigBackground - Indica si se utiliza una imagen grande de fondo.
 * @param primaryColor - El color primario.
 * @param secondaryColor - El color secundario.
 * @param tertiaryColor - El color terciario.
 * @param background - El fondo.
 * @param fontFamilyName - El nombre de la familia de fuentes.
 * @param icon - El ícono.
 */
export interface LookAndFeelDto {
  lookAndFeelId: number;
  imageBackgroundLogin: string;
  bigImageBackgroundLogin: string,
  useBigBackground: boolean,
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  background: string;
  fontFamilyName: string;
  icon: string;
}
