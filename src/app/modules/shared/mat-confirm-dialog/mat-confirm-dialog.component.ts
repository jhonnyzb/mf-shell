import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.scss']
})
/**
 * Componente de diálogo de confirmación.
 */
export class MatConfirmDialogComponent {
  dialogIcon = "";
  confirmText = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MatConfirmDialogComponent>,
    private router: Router
  ) {
    this.dialogIcon = data.success ? "../../../../assets/img/check-circle.svg" : "../../../../assets/img/Icon-material-error.svg";
    this.confirmText = data.confirmText || "Aceptar";
  }

  closeDialog() {
    this.dialogRef.close(false);

  }

  /**
   * Cierra el diálogo de confirmación.
   *
   * @param {void} No recibe ningún parámetro.
   * @returns {void} No devuelve ningún valor.
   */
  cerrarDialogo(): void {
    this.dialogRef.close(false);

  }

  /**
   * Función que se ejecuta cuando se confirma una acción.
   *
   * @param page - La página a la que se debe navegar después de confirmar. (Opcional)
   * @returns void
   */
  confirmado(): void {

    if (this.data.page == null) {
      this.dialogRef.close(true);
    } else {
      this.router.navigate([this.data.page]);
      this.dialogRef.close(true);
    }

  }

  /**
   * Comprueba la URL de la ruta.
   *
   * @returns {boolean} - Devuelve `true` si la URL de la ruta es válida, de lo contrario devuelve `false`.
   */
  checkRouteUrl() {
    return false;
  }

}
