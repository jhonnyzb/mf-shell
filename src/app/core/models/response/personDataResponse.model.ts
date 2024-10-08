
export class PersonDataResponseModel {
  /**
 * Modelo de respuesta que representa los datos de una persona.
 *
 * @param personId - El ID de la persona.
 * @param accountId - El ID de la cuenta.
 * @param programId - El ID del programa.
 * @param person - El objeto que contiene los datos de la persona.
 */
  constructor(
    public personId: number,
    public accountId: number,
    public programId: number,
    public person: PersonResponseModel
  ) { }
}


export class PersonResponseModel {
  /**
 * Modelo de respuesta para los datos de una persona.
 *
 * @param personTypeId - El ID del tipo de persona.
 * @param personTypeName - El nombre del tipo de persona.
 * @param identificationTypeId - El ID del tipo de identificación.
 * @param identificationTypeName - El nombre del tipo de identificación.
 * @param identificationNumber - El número de identificación.
 * @param verificationDigit - El dígito de verificación.
 * @param names - Los nombres de la persona.
 * @param lastNames - Los apellidos de la persona.
 * @param genderId - El ID del género.
 * @param genderName - El nombre del género.
 * @param civilStatusId - El ID del estado civil.
 * @param civilStatusName - El nombre del estado civil.
 * @param typePhoneId1 - El ID del tipo de teléfono 1.
 * @param typePhoneName1 - El nombre del tipo de teléfono 1.
 * @param phone1 - El número de teléfono 1.
 * @param telephoneExtension1 - La extensión telefónica 1.
 * @param typePhoneId2 - El ID del tipo de teléfono 2.
 * @param typePhoneName2 - El nombre del tipo de teléfono 2.
 * @param phone2 - El número de teléfono 2.
 * @param telephoneExtension2 - La extensión telefónica 2.
 * @param email - El correo electrónico de la persona.
 * @param stratumId - El ID del estrato.
 * @param stratumName - El nombre del estrato.
 * @param statusId - El ID del estado.
 * @param statusName - El nombre del estado.
 * @param fullName - El nombre completo de la persona.
 * @param addressResidence - La dirección de residencia de la persona.
 * @param neighborhoodResidence - El barrio de residencia de la persona.
 * @param cityResidenceId - El ID de la ciudad de residencia.
 * @param cityResidenceName - El nombre de la ciudad de residencia.
 * @param stateProvinceResidenceId - El ID del estado/provincia de residencia.
 * @param stateProvinceResidenceName - El nombre del estado/provincia de residencia.
 * @param countryResidenceId - El ID del país de residencia.
 * @param countryResidenceName - El nombre del país de residencia.
 * @param account - El objeto de respuesta de la cuenta asociada a la persona.
 */
  constructor(
    public personTypeId: number,
    public personTypeName: string,
    public identificationTypeId: number,
    public identificationTypeName: string,
    public identificationNumber: string,
    public verificationDigit: any,
    public names: string,
    public lastNames: string,
    public genderId: number,
    public genderName: string,
    public civilStatusId: any,
    public civilStatusName: string,
    public typePhoneId1: number,
    public typePhoneName1: string,
    public phone1: string,
    public telephoneExtension1: string,
    public typePhoneId2: any,
    public typePhoneName2: string,
    public phone2: string,
    public telephoneExtension2: string,
    public email: string,
    public stratumId: number,
    public stratumName: string,
    public statusId: number,
    public statusName: string,
    public fullName: string,
    public addressResidence: string,
    public neighborhoodResidence: string,
    public cityResidenceId: string,
    public cityResidenceName: string,
    public stateProvinceResidenceId: string,
    public stateProvinceResidenceName: string,
    public countryResidenceId: number,
    public countryResidenceName: string,
    public account: AccountResponseModel
  ) { }
}


export class AccountResponseModel {
  /**
 * Modelo de respuesta para los datos de una persona en una cuenta.
 *
 * @param {string} affiliationDate - La fecha de afiliación de la cuenta.
 * @param {number} statusId - El ID del estado de la cuenta.
 * @param {string} statusName - El nombre del estado de la cuenta.
 * @param {string} statusDate - La fecha del estado de la cuenta.
 * @param {any} desaffiliationDate - La fecha de desafiliación de la cuenta.
 * @param {string} observations - Las observaciones de la cuenta.
 * @param {number} clusterId - El ID del clúster de la cuenta.
 * @param {string} clusterName - El nombre del clúster de la cuenta.
 * @param {boolean} acceptHabeasData - Indica si se acepta el aviso de privacidad.
 * @param {boolean} acceptTermsAndConditions - Indica si se aceptan los términos y condiciones.
 * @param {string} dateAcceptTermsAndConditions - La fecha de aceptación de los términos y condiciones.
 * @param {boolean} fromPublicCreation - Indica si la cuenta fue creada desde el público.
 * @param {number} pointsBalance - El saldo de puntos de la cuenta.
 * @param {number} pointsIssued - Los puntos emitidos de la cuenta.
 * @param {string} pointName - El nombre del punto de la cuenta.
 * @param {AffiliationResponseModel} affiliation - El modelo de respuesta de afiliación de la cuenta.
 */
  constructor(
    public affiliationDate: string,
    public statusId: number,
    public statusName: string,
    public statusDate: string,
    public desaffiliationDate: any,
    public observations: string,
    public clusterId: number,
    public clusterName: string,
    public acceptHabeasData: boolean,
    public acceptTermsAndConditions: boolean,
    public dateAcceptTermsAndConditions: string,
    public fromPublicCreation: boolean,
    public pointsBalance: number,
    public pointsIssued: number,
    public pointName: string,
    public affiliation: AffiliationResponseModel
  ) { }
}


export class AffiliationResponseModel {
  /**
 * Modelo de respuesta para los datos de afiliación.
 *
 * @param affiliationId - El ID de la afiliación.
 * @param agencyId - El ID de la agencia.
 * @param agencyName - El nombre de la agencia.
 * @param regionals - Los datos regionales.
 * @param affiliationDate - La fecha de afiliación.
 * @param desaffiliationDate - La fecha de desafiliación.
 * @param affiliationClassId - El ID de la clase de afiliación.
 * @param affiliationClassName - El nombre de la clase de afiliación.
 * @param externalCode - El código externo.
 */
  constructor(
    public affiliationId: number,
    public agencyId: number,
    public agencyName: string,
    public regionals: any,
    public affiliationDate: string,
    public desaffiliationDate: string,
    public affiliationClassId: number,
    public affiliationClassName: string,
    public externalCode: string
  ) { }
}
