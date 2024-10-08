import { LookAndFeelDto, UrlToProgramDto } from "src/app/infrastructure/dto/response/program.dto";
import { ProgramRequestModel } from "../models/request/programRequest.model";
import { LookAndFeelModel, UrlToProgramModel } from "../models/response/urlToProgram.model";
import { ProgramRequestDto } from "src/app/infrastructure/dto/request/programRequest.dto";

export class LookAndFeelMapper {


  /**
   * Convierte un objeto LookAndFeelDto en un modelo LookAndFeelDomain.
   *
   * @param lookAndFeelDto - El objeto LookAndFeelDto a convertir.
   * @returns El modelo LookAndFeelDomain resultante.
   */
  static fromApiToDomainLookAndFeel(lookAndFeelDto: LookAndFeelDto): LookAndFeelModel {
    return {
      LookAndFeelId: lookAndFeelDto.lookAndFeelId,
      ImageBackgroundLogin: lookAndFeelDto.imageBackgroundLogin,
      BigImageBackgroundLogin: lookAndFeelDto.bigImageBackgroundLogin,
      UseBigBackground: lookAndFeelDto.useBigBackground,
      PrimaryColor: lookAndFeelDto.primaryColor,
      SecondaryColor: lookAndFeelDto.secondaryColor,
      TertiaryColor: lookAndFeelDto.tertiaryColor,
      backgroundColor: lookAndFeelDto.background,
      FontFamilyName: lookAndFeelDto.fontFamilyName,
      Icon: lookAndFeelDto.icon
    };
  }

  /**
   * Convierte un objeto de dominio de programa en un objeto DTO de solicitud de programa.
   *
   * @param programModel El objeto de dominio de programa a convertir.
   * @returns El objeto DTO de solicitud de programa convertido.
   */
  static programDomainToApi(programModel: ProgramRequestModel): ProgramRequestDto {
    return {
      URL: programModel.URL
    }
  }

  /**
   * Convierte un objeto de tipo UrlToProgramDto a un objeto de tipo UrlToProgramModel.
   *
   * @param programDto - El objeto de tipo UrlToProgramDto a convertir.
   * @returns El objeto de tipo UrlToProgramModel convertido.
   */
  static programApiToDomain(programDto: UrlToProgramDto): UrlToProgramModel {
    return {
      ProgramId: programDto.programId,
      Name: programDto.name,
      PasswordMinLength: programDto.passwordMinLength,
      CanRegisterOnWebResponsive: programDto.canRegisterOnWebResponsive,
      TagManagerWebGestor: programDto.tagManagerWebGestor,
      LookAndFeel: this.fromApiToDomainLookAndFeel(programDto.lookAndFeel),
      TagManagerWebResponsive: programDto.tagManagerWebResponsive,
      Copyright: programDto.copyright
    }
  }
}
