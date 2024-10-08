import { PolicyAcceptanceRequestDto } from "src/app/infrastructure/dto/request/policyRequest.dto";
import { PolicyAcceptanceRequestModel } from "../models/request/policyRequest.model";

export class PolicyConfigFormMapper {

  /**
   * Convierte un modelo de dominio de formulario de confirmación de aceptación de políticas en un DTO de solicitud de aceptación de políticas.
   *
   * @param model - El modelo de dominio de formulario de confirmación de aceptación de políticas.
   * @returns El DTO de solicitud de aceptación de políticas.
   */
  static policyAcceptanceConfirmFormDomainToApi(model: PolicyAcceptanceRequestModel): PolicyAcceptanceRequestDto {
    return new PolicyAcceptanceRequestDto(
      model.AcceptTermsAndConditions,
      model.AcceptHabeasData
    );
  }


}
