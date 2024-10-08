import { Component, Inject, Input } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { getSession } from "src/app/core/utils/encryptData";

@Component({
  selector: "app-mat-form-nequi-daviplata",
  templateUrl: "./mat-form-nequi-daviplata.component.html",
  styleUrls: ["./mat-form-nequi-daviplata.component.scss"],
})
/**
 * Componente para el formulario de Nequi Daviplata.
 */
export class MatFormNequiDaviplataComponent {
  @Input() closePopup!: boolean;
  disableButton: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MatFormNequiDaviplataComponent>
  ) { }

  /**
   * Valida los datos del usuario.
   *
   * @param data - Los datos del usuario a validar.
   * @returns El nombre de la clase CSS a aplicar en caso de error, o "terciary" en caso contrario.
   */
  validateDataUser(data: any): string {
    if (data.ExpresionRegular && !new RegExp(data.ExpresionRegular).test(data.ValorDefault)) {
      this.disableButton = true;
      return "color-error";
    } else {
      return "terciary";
    }
  }

  /**
   * Cierra el diálogo y devuelve un objeto indicando si es válido o no.
   *
   * @param close - Indica si se debe cerrar el diálogo.
   */
  closeDialog(close: boolean): void {
    let popupValidate = null
    if (sessionStorage.getItem('isValidatePopup')) {
      popupValidate = getSession('isValidatePopup');
    }
    if (popupValidate === 'true' && close) {
      close = true;
      this.dialogRef.close({
        IsValid: close,
      });
    }
    this.dialogRef.close({
      IsValid: close,
    });
  }
}
