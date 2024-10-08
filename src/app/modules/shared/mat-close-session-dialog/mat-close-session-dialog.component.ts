import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-close-session-dialog',
  templateUrl: './mat-close-session-dialog.component.html',
  styleUrls: ['./mat-close-session-dialog.component.scss']
})

export class MatCloseSessionDialogComponent {

  dialogIcon = "../../../../assets/img/info-confirm.svg";

  constructor(
    /**
 * Componente de diálogo para cerrar sesión.
 *
 * @param data - Datos pasados al diálogo.
 * @param dialogRef - Referencia al diálogo actual.
 */
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MatCloseSessionDialogComponent>,
  ) { }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

}
