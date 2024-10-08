import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LookAndFeelRepository } from './core/repositories/lookAndFeel.repository';
import { LookAndFeelService } from './infrastructure/services/look-and-feel.service';
import { HttpConfigInterceptor } from './core/interceptor/httpconfig.interceptor';
import { ToastGenericRepository } from './core/repositories/toastGeneric.repository';
import { ToastGenericService } from './infrastructure/services/toast-generic.service';
import { BoardRepository } from './core/repositories/board.repository';
import { BoardService } from './infrastructure/services/board.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerIntercetor } from './infrastructure/services/spinner.interceptor';
import { PagesModule } from './modules/pages/pages.module';
import { SharedModule } from './modules/shared/shared.module';
import { CategoryRepository } from './core/repositories/category.repository';
import { CategoryService } from './infrastructure/services/category.services';
import { ProductRepository } from './core/repositories/products.repository';
import { ProductService } from './infrastructure/services/products.services';
import { InactivityService } from './infrastructure/services/inactivity.service';
import { InactivityRepository } from './core/repositories/inactivity.repository';
import { AuthInterceptor } from './infrastructure/services/auth.interceptor';
import { GtmEventsService } from './infrastructure/services/gtm-events.service';
import { GtmEventsRepository } from './core/repositories/gtmEvents.repository';

registerLocaleData(localeEs, 'es');
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PagesModule,
    SharedModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerIntercetor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: "es" },

    { provide: LookAndFeelRepository, useClass: LookAndFeelService },
    { provide: ToastGenericRepository, useClass: ToastGenericService },
    { provide: BoardRepository, useClass: BoardService },
    { provide: CategoryRepository, useClass: CategoryService },
    { provide: ProductRepository, useClass: ProductService },
    { provide: InactivityRepository, useClass: InactivityService },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: GtmEventsRepository, useClass: GtmEventsService },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
