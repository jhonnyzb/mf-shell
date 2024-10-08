import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogParams } from "src/app/core/models/insite/dialogParams.model";
import { MatCloseSessionDialogComponent } from "src/app/modules/shared/mat-close-session-dialog/mat-close-session-dialog.component";
import { MatConfirmDialogComponent } from "src/app/modules/shared/mat-confirm-dialog/mat-confirm-dialog.component";
import { MatFormNequiDaviplataComponent } from "src/app/modules/shared/mat-form-nequi-daviplata/mat-form-nequi-daviplata.component";
import { DialogParamsAward } from "../models/dialogParams.model";
import { MatConfirmAwardComponent } from "src/app/modules/shared/mat-confirm-award/mat-confirm-award.component";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  constructor(private dialog: MatDialog) {

  }


  /**
   * Abre un diálogo de confirmación.
   *
   * @param msg - El mensaje de confirmación.
   * @param dialogParams - (Opcional) Parámetros adicionales para el diálogo.
   * @returns Una instancia del diálogo abierto.
   */
  openConfirmDialog(msg: any, dialogParams?: DialogParams) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '260',
      panelClass: 'confirm-dialog',
      disableClose: true,
      data: {
        message: msg,
        page: dialogParams?.page,
        confirmText: dialogParams?.confirmText,
        success: dialogParams?.success
      }
    });
  }

  /**
   * Abre un diálogo para cerrar una sesión.
   *
   * @param dialogParams - Parámetros opcionales para personalizar el diálogo.
   * @param dialogParams.msg - El mensaje que se mostrará en el diálogo.
   * @param dialogParams.page - La página asociada al diálogo.
   * @param dialogParams.confirmText - El texto del botón de confirmación.
   * @param dialogParams.success - Indica si la operación fue exitosa.
   *
   * @returns Una instancia del diálogo abierto.
   */
  openCloseSessionDialog(dialogParams?: DialogParams) {
    this.dialog.closeAll();
    setTimeout(() => {
      return this.dialog.open(MatCloseSessionDialogComponent, {
        width: 'auto',
        height: 'auto',
        panelClass: 'confirm-dialog',
        disableClose: true,
        data: {
          message: dialogParams.msg,
          page: dialogParams?.page,
          confirmText: dialogParams?.confirmText,
          success: dialogParams?.success
        }
      });
    });
  }


  /**
   * Abre un diálogo para el formulario de Nequi Daviplata.
   *
   * @param product - El producto que se pasará como dato al diálogo.
   * @returns Una referencia al diálogo abierto.
   */
  openDialogFormNequiDaviplata(product: any) {
    return this.dialog.open(MatFormNequiDaviplataComponent, {
      width: 'auto',
      panelClass: 'dialog-product',
      disableClose: true,
      data: product
    });
  }

  /**
   * abre un diálogo de confirmación para premios
   * @param msg
   * @param dialogParamsAward
   * @returns
   */
  openConfirmDialogProduct(msg: string, dialogParamsAward?: DialogParamsAward) {
    return this.dialog.open(MatConfirmAwardComponent, {
      width: '600px',
      height: '500px',
      panelClass: 'confirm-dialog',
      disableClose: false,
      data: {
        message: msg,
        typeAward: dialogParamsAward.TypeAward
      }
    });
  }
}
