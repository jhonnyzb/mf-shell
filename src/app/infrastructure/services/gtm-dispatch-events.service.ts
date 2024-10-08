import { Injectable } from '@angular/core';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para enviar eventos a Google Tag Manager.
 * Implementa la interfaz GtmDispatchEventsRepository.
 */
export class GtmDispatchEventsService implements GtmDispatchEventsRepository {
  constructor() { }
  /**
   *
   * @param event - El evento personalizado a enviar.
   */
  sendEvent(event: any): void {
    let customEvent = new CustomEvent('gtmEvent', { detail: event });
    document.dispatchEvent(customEvent);
  }

}
