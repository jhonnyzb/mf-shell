import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { ToastGenericRepository } from 'src/app/core/repositories/toastGeneric.repository';

@Injectable({
  providedIn: 'root'
})
export class ToastGenericService implements ToastGenericRepository {

  constructor(private toastrService: ToastrService) { }


  /**
   * Muestra un mensaje de error genérico en forma de toast.
   *
   * @param {string} mensaje - El mensaje de error a mostrar.
   * @param {number} [tiempoEspera=7000] - El tiempo de espera en milisegundos antes de que el toast se cierre automáticamente.
   * @param {boolean} [mostrarBarraProgreso=false] - Indica si se debe mostrar una barra de progreso en el toast.
   * @param {boolean} [desactivarTiempoEspera=false] - Indica si se debe desactivar el tiempo de espera y mantener el toast abierto indefinidamente.
   * @param {string} [animacionProgreso='increasing'] - La animación de la barra de progreso.
   * @param {boolean} [permitirCerrarAlTocar=false] - Indica si se puede cerrar el toast al tocarlo.
   * @param {string} [clasePosicion='toast-top-center'] - La clase de posición del toast.
   * @param {boolean} [mostrarBotonCerrar=true] - Indica si se debe mostrar un botón de cerrar en el toast.
   */
  genericErrorMessage() {
    this.toastrService.error('Lo sentimos, ha ocurrido un error inesperado en el sistema. Por favor, inténtalo de nuevo más tarde.', undefined, {
      timeOut: 7000,
      progressBar: false,
      disableTimeOut: 'extendedTimeOut',
      progressAnimation: 'increasing',
      tapToDismiss: false,
      positionClass: 'toast-top-center',
      closeButton: true,
    });
  }
}
