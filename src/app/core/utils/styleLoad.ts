import { LookAndFeelModel } from "../models/response/urlToProgram.model";

/**
 * Interfaz que representa un tema mapeado.
 */
export interface IMappedTheme {
  [key: string]: string | null;
}

/**
 * Aplica un tema personalizado a los estilos de la aplicación.
 *
 * @param theme - El objeto que representa el tema a aplicar.
 */
export const applyTheme = (theme: LookAndFeelModel): void => {
  if (!theme) return;

  theme = extend(theme);
  const themeObject: IMappedTheme = mapTheme(theme);
  if (!themeObject) return;

  const root = document.documentElement;
  Object.keys(themeObject).forEach((property) => {
    if (property === "name" || property === null) {
      return;
    }
    root.style.setProperty(property, themeObject[property]);
  });
};


/**
 * Mapea las variables de apariencia a un objeto de tema mapeado.
 *
 * @param variables - Las variables de apariencia a mapear.
 * @returns El objeto de tema mapeado.
 */
export const mapTheme = (variables: LookAndFeelModel): IMappedTheme => {
  return {
    "--ngx-valepro-color-primary": variables.PrimaryColor,
    "--ngx-valepro-color-secondary": variables.SecondaryColor,
    "--ngx-valepro-color-tertiary": variables.TertiaryColor,
    "--ngx-valepro-color-background": variables.backgroundColor,
    "--imagen-background-login": `url(${variables.ImageBackgroundLogin})`,
    "--background-login": `url(${variables.BigImageBackgroundLogin})`
  };
};


/**
 * Extiende un tema de apariencia con un nuevo tema.
 *
 * @param newTheme El nuevo tema que se va a agregar.
 * @returns El tema de apariencia extendido.
 */
export const extend = (newTheme: LookAndFeelModel): LookAndFeelModel => {
  return { ...newTheme };
};
