import { ListBoardsRequestDto } from "../../infrastructure/dto/request/listBoardRequest.dto";
import { ListBoardsRequestModel } from "../models/request/listBoardRequest.model";

/**
 * Convierte un objeto de modelo de solicitud de lista de tableros en un objeto de DTO de solicitud de lista de tableros.
 *
 * @param model - El objeto de modelo de solicitud de lista de tableros.
 * @returns El objeto de DTO de solicitud de lista de tableros.
 */
export class BoardsMapper {
  static listBoardFromDomainToApi(model: ListBoardsRequestModel): ListBoardsRequestDto {
    return {
      BoardTypeId: model.boardTypeId,
      ProgramId: model.programId,
      IsWebResponsive: model.isWebResponsive,
    };
  }

}
