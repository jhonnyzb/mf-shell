import { ErrorDto } from "./errorResponse.dto";

/**
 * Interfaz que representa un programa.
 * @typedef {Object} ProgramDto
 * @property {number} IDPrograma - El ID del programa.
 * @property {string} Programa - El nombre del programa.
 * @property {string} Descripcion - La descripción del programa.
 * @property {boolean} EsMultiPais - Indica si el programa es multi-país.
 * @property {string} URLTerminosCondicionesApp - La URL de los términos y condiciones de la aplicación.
 * @property {string} URLCondicionesProgramaApp - La URL de las condiciones del programa en la aplicación.
 * @property {string} URLPoliticasDivulgacionApp - La URL de las políticas de divulgación en la aplicación.
 * @property {boolean} IsVisibleURLPoliticasDivulgacionApp - Indica si la URL de las políticas de divulgación es visible en la aplicación.
 * @property {string} URLTyCCatalogo - La URL de los términos y condiciones del catálogo.
 * @property {boolean} IsVisibleActualizarVersionApp - Indica si la opción de actualizar la versión de la aplicación es visible.
 * @property {boolean} TieneResumenDePuntos - Indica si el programa tiene un resumen de puntos.
 * @property {number} IDTipoPrograma - El ID del tipo de programa.
 * @property {Date} FechaInicioVigencia - La fecha de inicio de vigencia del programa.
 * @property {Date} FechaFinalVigencia - La fecha de finalización de vigencia del programa.
 * @property {number} IDEstado - El ID del estado del programa.
 * @property {string} TipoPrograma - El tipo de programa.
 * @property {string} Estado - El estado del programa.
 * @property {boolean} RequiereRespuestaAPreguntaDeSeguridad - Indica si se requiere una respuesta a una pregunta de seguridad.
 * @property {boolean} RequierePreguntasParaRedemir - Indica si se requieren preguntas para redimir.
 * @property {number} ValidacionIdentidadNoPreguntas - El número de preguntas para la validación de identidad.
 * @property {number} ValidacionIdentidadNoMinimoRptasCorrectas - El número mínimo de respuestas correctas para la validación de identidad.
 * @property {string} NumeroCallCenterBta - El número de call center de Bogotá.
 * @property {string} NumeroCallCenterPais - El número de call center del país.
 * @property {string} DireccionContacto - La dirección de contacto.
 * @property {string} EmailContacto - El correo electrónico de contacto.
 * @property {boolean} RequiereCuestionarioActivarUsuario - Indica si se requiere un cuestionario para activar el usuario.
 * @property {boolean} PermiteActualizarDatosIdentificacion - Indica si se permite actualizar los datos de identificación.
 * @property {boolean} PermiteActualizarDatosBasicos - Indica si se permite actualizar los datos básicos.
 * @property {boolean} PermiteActualizarDirecciones - Indica si se permite actualizar las direcciones.
 * @property {boolean} PermiteActualizarDatosContacto - Indica si se permite actualizar los datos de contacto.
 * @property {boolean} RequiereActualizarInfoPersona - Indica si se requiere actualizar la información de la persona.
 * @property {number} IDTipoPersona - El ID del tipo de persona.
 * @property {number} IDPais - El ID del país.
 * @property {string} Pais - El país.
 * @property {number} DigitosDecimales - El número de dígitos decimales.
 * @property {boolean} AppEsCerrada - Indica si la aplicación está cerrada.
 * @property {string} InfoAppCerrada - La información de la aplicación cerrada.
 * @property {boolean} RegistroSolicitaCedula - Indica si el registro solicita la cédula.
 * @property {number} IntentosReenvioMensajesPassword - El número de intentos de reenvío de mensajes de contraseña.
 * @property {string} MensajeErrorReenvioMensajesPassword - El mensaje de error de reenvío de mensajes de contraseña.
 * @property {boolean} RequiereActualizarClave - Indica si se requiere actualizar la clave.
 * @property {number} IDActualizarDatos - El ID de la actualización de datos.
 * @property {any[]} OAuthProviders - Los proveedores de OAuth.
 * @property {string} App_InfoCalendarioRedencion - La información del calendario de redención de la aplicación.
 * @property {boolean} AccesoRedesSociales - Indica si se permite el acceso a las redes sociales.
 * @property {boolean} PermiteRegistroPlataforma - Indica si se permite el registro en la plataforma.
 * @property {number} IDEmpresaPromotoraPpal - El ID de la empresa promotora principal.
 * @property {number} IDPunto - El ID del punto.
 * @property {boolean} PermitirCantidadEnRedencion - Indica si se permite la cantidad en la redención.
 * @property {number} CantidadMaximaEnRedencion - La cantidad máxima en la redención.
 * @property {ErrorDto} Error - El error.
 * @property {number} IDMonedaGL - El ID de la moneda GL.
 * @property {string} HomeDefault - La página de inicio predeterminada.
 * @property {boolean} ActualizarTyC - Indica si se actualizan los términos y condiciones.
 * @property {MenusAccesoDto[]} MenusAcceso - Los menús de acceso.
 * @property {string} UrlOrigen - La URL de origen.
 * @property {boolean} SolicitaCalificacionTienda - Indica si se solicita la calificación de la tienda.
 * @property {string} MensajeCalificacionTienda - El mensaje de calificación de la tienda.
 * @property {boolean} MostrarPrimerPasoRegistro - Indica si se muestra el primer paso del registro.
 * @property {number} MaximoItemsRedencion - El número máximo de items en la redención.
 * @property {string} MensajeErrorMaximoItemsRedencion - El mensaje de error del número máximo de items en la redención.
 * @property {number} PorcentajePagoEnPuntos - El porcentaje de pago en puntos.
 * @property {boolean} RegistrarSalesManago - Indica si se registra en SalesManago.
 * @property {boolean} MostrarWelcomeKit - Indica si se muestra el Welcome Kit.
 * @property {boolean} iOSPruebaTienda - Indica si es una prueba de tienda en iOS.
 * @property {boolean} MostrarOnboarding - Indica si se muestra el onboarding.
 * @property {string} URLBienvenida - La URL de bienvenida.
 * @property {boolean} MostrarPuntos - Indica si se muestran los puntos.
 * @property {number} IDOrdenamientoPremios - El ID del ordenamiento de premios.
 * @property {boolean} AutorizadorDeCodigoParaActualizarDatos - Indica si se requiere autorización de código para actualizar los datos.
 * @property {boolean} AutorizadorDeCodigoParaRedimirPremio - Indica si se requiere autorización de código para redimir el premio.
 * @property {boolean} PermiteLoginConCodigo - Indica si se permite el inicio de sesión con código.
 * @property {boolean} MostrarBuscador - Indica si se muestra el buscador.
 * @property {boolean} MostrarArticulosParaTi - Indica si se muestran los artículos para ti.
 * @property {boolean} RecaptchaVisible - Indica si el recaptcha es visible.
 * @property {number} MaximoIntentosLogin - El número máximo de intentos de inicio de sesión.
 * @property {number} EstadoEmailVerificado - El estado de verificación del correo electrónico.
 * @property {number} EstadoTelefonoMovilVerificado - El estado de verificación del teléfono móvil.
 */
export interface ProgramDto {
  IDPrograma: number;
  Programa: string;
  Descripcion: string;
  EsMultiPais: boolean;
  URLTerminosCondicionesApp: string;
  URLCondicionesProgramaApp: string;
  URLPoliticasDivulgacionApp: string;
  IsVisibleURLPoliticasDivulgacionApp: boolean;
  URLTyCCatalogo: string;
  IsVisibleActualizarVersionApp: boolean;
  TieneResumenDePuntos: boolean;
  IDTipoPrograma: number;
  FechaInicioVigencia: Date;
  FechaFinalVigencia: Date;
  IDEstado: number;
  TipoPrograma: string;
  Estado: string;
  RequiereRespuestaAPreguntaDeSeguridad: boolean;
  RequierePreguntasParaRedemir: boolean;
  ValidacionIdentidadNoPreguntas: number;
  ValidacionIdentidadNoMinimoRptasCorrectas: number;
  NumeroCallCenterBta: string;
  NumeroCallCenterPais: string;
  DireccionContacto: string;
  EmailContacto: string;
  RequiereCuestionarioActivarUsuario: boolean;
  PermiteActualizarDatosIdentificacion: boolean;
  PermiteActualizarDatosBasicos: boolean;
  PermiteActualizarDirecciones: boolean;
  PermiteActualizarDatosContacto: boolean;
  RequiereActualizarInfoPersona: boolean;
  IDTipoPersona: number;
  IDPais: number;
  Pais: string;
  DigitosDecimales: number;
  AppEsCerrada: boolean;
  InfoAppCerrada: string;
  RegistroSolicitaCedula: boolean;
  IntentosReenvioMensajesPassword: number;
  MensajeErrorReenvioMensajesPassword: string;
  RequiereActualizarClave: boolean;
  IDActualizarDatos: number;
  OAuthProviders: any[];
  App_InfoCalendarioRedencion: string;
  AccesoRedesSociales: boolean;
  PermiteRegistroPlataforma: boolean;
  IDEmpresaPromotoraPpal: number;
  IDPunto: number;
  PermitirCantidadEnRedencion: boolean;
  CantidadMaximaEnRedencion: number;
  Error: ErrorDto;
  IDMonedaGL: number;
  HomeDefault: string;
  ActualizarTyC: boolean;
  MenusAcceso: MenusAccesoDto[];
  UrlOrigen: string;
  SolicitaCalificacionTienda: boolean;
  MensajeCalificacionTienda: string;
  MostrarPrimerPasoRegistro: boolean;
  MaximoItemsRedencion: number;
  MensajeErrorMaximoItemsRedencion: string;
  PorcentajePagoEnPuntos: number;
  RegistrarSalesManago: boolean;
  MostrarWelcomeKit: boolean;
  iOSPruebaTienda: boolean;
  MostrarOnboarding: boolean;
  URLBienvenida: string;
  MostrarPuntos: boolean;
  IDOrdenamientoPremios: number;
  AutorizadorDeCodigoParaActualizarDatos: boolean;
  AutorizadorDeCodigoParaRedimirPremio: boolean;
  PermiteLoginConCodigo: boolean;
  MostrarBuscador: boolean;
  MostrarArticulosParaTi: boolean;
  RecaptchaVisible: boolean;
  MaximoIntentosLogin: number;
  EstadoEmailVerificado: number;
  EstadoTelefonoMovilVerificado: number;
}


/**
 * Interfaz que representa los datos de un menú secundario de la sección 2.
 * @interface SubMenuSeccion2Dto
 */
export interface SubMenuSeccion2Dto {
  SubMenus: any[];
}


/**
 * Interfaz que representa un menú secundario.
 *
 * @param IDPagina - El ID de la página.
 * @param IDMenu - El ID del menú.
 * @param PermiteAcceso - Indica si se permite el acceso al menú.
 * @param MenuTexto - El texto del menú.
 * @param ObjectPosition - La posición del objeto.
 * @param AsociatedModule - El módulo asociado.
 * @param AsociatedCluster - El clúster asociado.
 * @param SubMenuSeccion - La sección del submenú.
 * @param PageName - El nombre de la página.
 */
export interface SubMenuDto {
  IDPagina: number;
  IDMenu: number;
  PermiteAcceso: boolean;
  MenuTexto: string;
  ObjectPosition: number;
  AsociatedModule: number;
  AsociatedCluster: number;
  SubMenuSeccion: SubMenuSeccion2Dto;
  PageName: string;
}

/**
 * Interfaz que representa un DTO de la respuesta de los programas de un menú secundario.
 * @interface SubMenuSeccionDto
 */
export interface SubMenuSeccionDto {
  SubMenus: SubMenuDto[];
}

/**
 * Interfaz que representa los datos de etiquetas.
 * @interface
 */
export interface LabelsDto {
  LabelHome: string;
  LabelServicios: string;
}

/**
 * Interfaz que representa los datos de los menús de acceso.
 * @interface MenusAccesoDto
 * @property {number} IDPagina - El ID de la página.
 * @property {number} IDMenu - El ID del menú.
 * @property {boolean} PermiteAcceso - Indica si se permite el acceso al menú.
 * @property {string} MenuTexto - El texto del menú.
 * @property {number} ObjectPosition - La posición del objeto.
 * @property {number} AsociatedModule - El módulo asociado.
 * @property {number} AsociatedCluster - El clúster asociado.
 * @property {SubMenuSeccionDto} SubMenuSeccion - La sección del submenú.
 * @property {LabelsDto} Labels - Las etiquetas.
 * @property {string} PageName - El nombre de la página.
 */
export interface MenusAccesoDto {
  IDPagina: number;
  IDMenu: number;
  PermiteAcceso: boolean;
  MenuTexto: string;
  ObjectPosition: number;
  AsociatedModule: number;
  AsociatedCluster: number;
  SubMenuSeccion: SubMenuSeccionDto;
  Labels: LabelsDto;
  PageName: string;
}
