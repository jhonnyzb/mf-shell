import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/infrastructure/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  isLoading = false;

  /**
   * Constructor de la clase SpinnerComponent.
   * @param spinnerService - El servicio SpinnerService utilizado para controlar el estado de carga.
   */
  constructor(private spinnerService: SpinnerService) {
    spinnerService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

}
