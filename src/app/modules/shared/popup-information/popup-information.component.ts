import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-popup-information",
  templateUrl: "./popup-information.component.html",
  styleUrls: ["./popup-information.component.scss"],
})
/**
 * Componente de información emergente.
 *
 * @remarks
 * Este componente se utiliza para mostrar información en una ventana emergente.
 *
 * @example
 * ```typescript
 * const popup = new PopupInformationComponent(dialogRef, data, router);
 * popup.navigation('/home');
 * popup.closeDialog();
 * popup.validarUrl();
 * ```
 */
export class PopupInformationComponent implements OnInit {
  imgInformation!: string;
  UrlDestinoNuevaVentana: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PopupInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.validarUrl();
  }

  /**
   *
   * @param url - La URL a la que se desea navegar.
   */
  navigation(url: any) {
    this.router.navigate([url]);
  }

  /**
   * Cierra el diálogo actual y devuelve un objeto con la bandera IsValid en false.
   */
  closeDialog() {
    this.dialogRef.close({
      IsValid: false,
    });
  }

  /**
   * Valida la URL de destino y establece la propiedad UrlDestinoNuevaVentana en true si cumple con las condiciones.
   *
   * @returns {void}
   */
  validarUrl(): void {
    if (
      this.data &&
      this.data.hasOwnProperty("UrlDestino") &&
      this.data.url.slice(0, 4) === "http"
    ) {
      this.UrlDestinoNuevaVentana = true;
    }
  }
}
