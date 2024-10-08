/**
 * Interfaz que representa los datos de una cuenta.
 *
 * @param IDCuenta - El ID de la cuenta.
 * @param IDEstablecimiento - El ID del establecimiento.
 * @param DireccionEstablecimiento - Los datos de dirección del establecimiento.
 * @param IDPersona - El ID de la persona.
 * @param IDTipoIdentificacion - El ID del tipo de identificación.
 * @param NumeroIdentificacion - El número de identificación.
 * @param DigitoChequeo - El dígito de chequeo.
 * @param TipoyNumeroIdentificacion - El tipo y número de identificación.
 * @param NombreEstablecimiento - El nombre del establecimiento.
 * @param TipoNegocio - El tipo de negocio.
 * @param IDPersonaVendedor - El ID de la persona vendedora.
 * @param IDPrograma - El ID del programa.
 * @param Programa - El programa.
 * @param IDPais - El ID del país.
 * @param Pais - El país.
 * @param IDGrupoPersona - El ID del grupo de persona.
 * @param GrupoPersona - El grupo de persona.
 * @param FechaBloqueo - La fecha de bloqueo.
 * @param IDEstado - El ID del estado.
 * @param Estado - El estado.
 * @param IDCausalEstado - El ID de la causal de estado.
 * @param CausalEstado - La causal de estado.
 * @param FechaEstado - La fecha de estado.
 * @param ConsolidarCuentaParaRedencion - Indica si la cuenta se debe consolidar para redención.
 * @param FechaAfiliacion - La fecha de afiliación.
 * @param Bloqueada - Indica si la cuenta está bloqueada.
 * @param IDMotivoBloqueo - El ID del motivo de bloqueo.
 * @param MotivoBloqueo - El motivo de bloqueo.
 * @param FechaDesafiliacion - La fecha de desafiliación.
 * @param Observaciones - Las observaciones.
 * @param IDPersonaRegistro - El ID de la persona de registro.
 * @param FechaRegistro - La fecha de registro.
 * @param IDPersonaActualizacion - El ID de la persona de actualización.
 * @param PersonaCuenta - La persona de la cuenta.
 * @param Empresa - La empresa.
 * @param ClaseAfiliacion - La clase de afiliación.
 * @param IDCluster - El ID del cluster.
 * @param Cluster - El cluster.
 * @param IDPunto - El ID del punto.
 * @param TipoPunto - El tipo de punto.
 * @param FechaActualizacion - La fecha de actualización.
 * @param FechaUltimaActualizacionDatos - La fecha de última actualización de datos.
 * @param SaldoPuntos - El saldo de puntos.
 * @param PuntosEmitidos - Los puntos emitidos.
 * @param PuntosReservados - Los puntos reservados.
 * @param PuntosRedimidos - Los puntos redimidos.
 * @param PuntosVencidos - Los puntos vencidos.
 * @param PuntosVencen1Mes - Los puntos que vencen en 1 mes.
 * @param PuntosVencen2Mes - Los puntos que vencen en 2 meses.
 * @param PuntosVencen3Mes - Los puntos que vencen en 3 meses.
 * @param lstPuntosVencimiento - La lista de puntos de vencimiento.
 * @param Error - El error.
 * @param TotalPuntosPorFacturas - El total de puntos por facturas.
 * @param TotalPuntosPorMisiones - El total de puntos por misiones.
 * @param IDReconocimiento - El ID del reconocimiento.
 * @param TituloReconocimiento - El título del reconocimiento.
 * @param ImagenReconocimiento - La imagen del reconocimiento.
 * @param Reconocimiento - El reconocimiento.
 * @param PorcentajeAumento - El porcentaje de aumento.
 * @param Email - El correo electrónico.
 * @param TelefonoCelular - El teléfono celular.
 * @param CodigoArea - El código de área.
 * @param UUID - El UUID.
 * @param NombresPersonaCuenta - Los nombres de la persona de la cuenta.
 * @param ApellidosPersonaCuenta - Los apellidos de la persona de la cuenta.
 * @param IDPersonaEstablecimiento - El ID de la persona del establecimiento.
 * @param IDOcupacion - El ID de la ocupación.
 * @param Telefono1_establecimiento - El teléfono 1 del establecimiento.
 * @param TipoTelefono1_establecimiento - El tipo de teléfono 1 del establecimiento.
 * @param Telefono2_establecimiento - El teléfono 2 del establecimiento.
 * @param TipoTelefono2_establecimiento - El tipo de teléfono 2 del establecimiento.
 * @param Telefono3_establecimiento - El teléfono 3 del establecimiento.
 * @param TipoTelefono3_establecimiento - El tipo de teléfono 3 del establecimiento.
 * @param Email_establecimiento - El correo electrónico del establecimiento.
 * @param PuntosPorTransferencia - Los puntos por transferencia.
 * @param VisualizacionMultiPunto - Indica si se visualiza el multipunto.
 * @param CodigoAgenciaPpal - El código de la agencia principal.
 * @param CodigoExterno - El código externo.
 * @param MostrarWelcomeKit - Indica si se muestra el welcome kit.
 * @param IDGenero - El ID del género.
 * @param Genero - El género.
 * @param FechaNacimientoConstitucion - La fecha de nacimiento o constitución.
 * @param Edad - La edad.
 * @param ValidacionEmail - Indica si se ha validado el correo electrónico.
 * @param ValidacionTelefono - Indica si se ha validado el teléfono.
 * @param ValidacionDireccion - Indica si se ha validado la dirección.
 */
export interface CuentasDto {
  IDCuenta: number
  IDEstablecimiento: number
  DireccionEstablecimiento: DireccionEstablecimientoDto
  IDPersona: number
  IDTipoIdentificacion: number
  NumeroIdentificacion: string
  DigitoChequeo: number
  TipoyNumeroIdentificacion: string
  NombreEstablecimiento: string
  TipoNegocio: string
  IDPersonaVendedor: number
  IDPrograma: number
  Programa: string
  IDPais: number
  Pais: string
  IDGrupoPersona: number
  GrupoPersona: string
  FechaBloqueo: string
  IDEstado: number
  Estado: string
  IDCausalEstado: number
  CausalEstado: string
  FechaEstado: string
  ConsolidarCuentaParaRedencion: boolean
  FechaAfiliacion: string
  Bloqueada: boolean
  IDMotivoBloqueo: number
  MotivoBloqueo: string
  FechaDesafiliacion: string
  Observaciones: string
  IDPersonaRegistro: number
  FechaRegistro: string
  IDPersonaActualizacion: number
  PersonaCuenta: string
  Empresa: string
  ClaseAfiliacion: string
  IDCluster: number
  Cluster: string
  IDPunto: number
  TipoPunto: string
  FechaActualizacion: string
  FechaUltimaActualizacionDatos: string
  SaldoPuntos: number
  PuntosEmitidos: number
  PuntosReservados: number
  PuntosRedimidos: number
  PuntosVencidos: number
  PuntosVencen1Mes: number
  PuntosVencen2Mes: number
  PuntosVencen3Mes: number
  lstPuntosVencimiento: LstPuntosVencimientoDto[]
  Error: Error
  TotalPuntosPorFacturas: number
  TotalPuntosPorMisiones: number
  IDReconocimiento: number
  TituloReconocimiento: string
  ImagenReconocimiento: string
  Reconocimiento: string
  PorcentajeAumento: number
  Email: string
  TelefonoCelular: string
  CodigoArea: string
  UUID: string
  NombresPersonaCuenta: string
  ApellidosPersonaCuenta: string
  IDPersonaEstablecimiento: number
  IDOcupacion: number
  Telefono1_establecimiento: string
  TipoTelefono1_establecimiento: string
  Telefono2_establecimiento: string
  TipoTelefono2_establecimiento: string
  Telefono3_establecimiento: string
  TipoTelefono3_establecimiento: string
  Email_establecimiento: string
  PuntosPorTransferencia: number
  VisualizacionMultiPunto: boolean
  CodigoAgenciaPpal: string
  CodigoExterno: string
  MostrarWelcomeKit: boolean
  IDGenero: number
  Genero: string
  FechaNacimientoConstitucion: Date
  Edad: number
  ValidacionEmail: boolean
  ValidacionTelefono: boolean
  ValidacionDireccion: boolean
}



/**
 * Interfaz que representa los datos de una dirección de establecimiento.
 *
 * @param IDDireccion - El ID de la dirección.
 * @param IDPersona - El ID de la persona asociada a la dirección.
 * @param IDTipoDireccion - El ID del tipo de dirección.
 * @param direccion - La dirección.
 * @param ZIPCode - El código ZIP.
 * @param IDCiudad - El ID de la ciudad.
 * @param nombreCiudadCorto - El nombre corto de la ciudad.
 * @param nombreCiudadLargo - El nombre largo de la ciudad.
 * @param NombreDepartamento - El nombre del departamento.
 * @param Barrio - El barrio.
 * @param IDTipoTelefono1 - El ID del primer tipo de teléfono.
 * @param Telefono1 - El primer número de teléfono.
 * @param ExtTelefono1 - La extensión del primer teléfono.
 * @param IDTipoTelefono2 - El ID del segundo tipo de teléfono.
 * @param Telefono2 - El segundo número de teléfono.
 * @param ExtTelefono2 - La extensión del segundo teléfono.
 * @param IDTipoTelefono3 - El ID del tercer tipo de teléfono.
 * @param Telefono3 - El tercer número de teléfono.
 * @param ExtTelefono3 - La extensión del tercer teléfono.
 * @param IDFuente - El ID de la fuente.
 * @param principal - Indica si es la dirección principal.
 * @param Valida - Indica si la dirección es válida.
 * @param Vigente - Indica si la dirección está vigente.
 * @param IDPersonaRegistro - El ID de la persona que registró la dirección.
 * @param FechaRegistro - La fecha de registro de la dirección.
 * @param IDPersonaActualizacion - El ID de la persona que actualizó la dirección.
 * @param FechaActualizacion - La fecha de actualización de la dirección.
 * @param Observaciones - Las observaciones de la dirección.
 * @param X - La coordenada X de la dirección.
 * @param Y - La coordenada Y de la dirección.
 * @param IDComuna - El ID de la comuna.
 * @param IDBarrio - El ID del barrio.
 * @param IDCiudadGeo - El ID de la ciudad geográfica.
 * @param DeshabilitarDirecciones - Indica si se deben deshabilitar las direcciones.
 */
export interface DireccionEstablecimientoDto {
  IDDireccion: number
  IDPersona: number
  IDTipoDireccion: number
  direccion: string
  ZIPCode: string
  IDCiudad: number
  nombreCiudadCorto: string
  nombreCiudadLargo: string
  NombreDepartamento: string
  Barrio: string
  IDTipoTelefono1: number
  Telefono1: string
  ExtTelefono1: string
  IDTipoTelefono2: number
  Telefono2: string
  ExtTelefono2: string
  IDTipoTelefono3: number
  Telefono3: string
  ExtTelefono3: string
  IDFuente: number
  principal: boolean
  Valida: boolean
  Vigente: boolean
  IDPersonaRegistro: number
  FechaRegistro: string
  IDPersonaActualizacion: number
  FechaActualizacion: string
  Observaciones: string
  X: number
  Y: number
  IDComuna: number
  IDBarrio: number
  IDCiudadGeo: number
  DeshabilitarDirecciones: boolean
}


/**
 * Interfaz para representar los datos de una lista de puntos de vencimiento.
 * @interface LstPuntosVencimientoDto
 */
export interface LstPuntosVencimientoDto {
  PuntosVencen: number
  FechaCorte: string
}
