import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getSession, saveSession } from 'src/app/core/utils/encryptData';

@Component({
  selector: 'app-mat-confirm-award',
  templateUrl: './mat-confirm-award.component.html',
  styleUrls: ['./mat-confirm-award.component.scss']
})
/**
 * Componente para confirmar un premio.
 */
export class MatConfirmAwardComponent {

  operators = [];
  selectedOperatorCodeId: number | null = null;
  isvalid = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MatConfirmAwardComponent>,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.getOperatorPhone()
  }

  /**
   * Obtiene el teléfono del operador.
   *
   * @returns El teléfono del operador.
   */
  getOperatorPhone() {
    this.operators = getSession('wr-c-operatorsphone');
  }

  closeDialog() {
    let obj = { flag: false, phoneId: null }
    this.dialogRef.close(obj);
  }

  /**
   * Cierra el diálogo y devuelve un objeto con la bandera y el ID del teléfono.
   * @returns {void}
   */
  goConfirm() {
    if (this.data.typeAward === 6) {
      if (this.selectedOperatorCodeId === null) {
        this.isvalid = false;
        return;
      }
    }
    const phoneId = this.selectedOperatorCodeId ? this.selectedOperatorCodeId : null;
    let obj = { flag: true, phoneId }
    this.dialogRef.close(obj);
  }

  /**
   * Cierra el diálogo actual y navega a la página de detalle de cuenta.
   * También guarda una sesión con la clave 'init' y el valor 'wr-c-update-data'.
   */
  goUpdateData() {
    this.dialogRef.close(false);
    this.router.navigate(['/main/account/detail-account'])
    saveSession('init', 'wr-c-update-data');
  }

  /**
   * Función que se ejecuta cuando ocurre un cambio.
   *
   * @param {void} - No recibe ningún parámetro.
   *
   * @returns {void} - No devuelve ningún valor.
   */
  onChange() {
    this.isvalid = true;
  }

}
