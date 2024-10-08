import { Injectable } from '@angular/core';
import { GtmEventsRepository } from 'src/app/core/repositories/gtmEvents.repository';

@Injectable({
  providedIn: 'root'
})

export class GtmEventsService implements GtmEventsRepository {

  /**
   * Envía un evento al padre de la ventana.
   * @param event - El evento que se va a enviar.
   */
  sendEvent(event: any) {
    window.parent.postMessage(JSON.stringify(event), '*');
  }
}
