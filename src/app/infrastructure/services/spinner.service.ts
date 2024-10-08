import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para mostrar y ocultar un spinner.
 */
export class SpinnerService {
  isLoading = new EventEmitter<boolean>();

  show(): void {
    this.isLoading.emit(true);
  }
  hide(): void {
    this.isLoading.emit(false);
  }

}
