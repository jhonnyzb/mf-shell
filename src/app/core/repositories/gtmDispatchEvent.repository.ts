/**
 * Envía un evento a Google Tag Manager.
 *
 * @param event - El evento que se va a enviar.
 */
export abstract class GtmDispatchEventsRepository {
  abstract sendEvent(event: any): void;
}
