import { Observable } from "rxjs";
import { ResponseBaseModel } from "../models/response/responseBase.model";
import { PolicyAcceptanceRequestModel } from "../models/request/policyRequest.model";

/**
 * Actualiza la aceptación de una política.
 *
 * @param requestModel - El modelo de solicitud de aceptación de política.
 * @returns Un observable que emite un modelo de respuesta base nulo.
 */
export abstract class PolicyRepository {
  abstract updatePolicyAcceptance(requestModel: PolicyAcceptanceRequestModel): Observable<ResponseBaseModel<null>>
}
