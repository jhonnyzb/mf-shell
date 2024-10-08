import { Injectable } from '@angular/core';
import { Observable, fromEvent, timer, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { InactivityRepository } from 'src/app/core/repositories/inactivity.repository';

@Injectable({
  providedIn: 'root',
})
export class InactivityService implements InactivityRepository {
  private inactivityTime = 300000;

  constructor() { }

  /**
   * Reinicia el temporizador de inactividad.
   *
   * Este método devuelve un observable que emite un valor después de un período de inactividad determinado.
   * El período de inactividad se define por la propiedad `inactivityTime`.
   *
   * @returns Un observable que emite un valor después de un período de inactividad.
   */
  resetTimer(): Observable<any> {
    const mouseMove$ = fromEvent(document, 'mousemove');
    const keyDown$ = fromEvent(document, 'keydown');
    return merge(mouseMove$, keyDown$).pipe(
      switchMap(() => timer(this.inactivityTime))
    );
  }
}
