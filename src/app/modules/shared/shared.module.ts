
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatConfirmDialogComponent } from "./mat-confirm-dialog/mat-confirm-dialog.component";
import { UiModule } from "./ui.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PolicyAcceptanceDialogComponent } from "./policy-acceptance-dialog/policy-acceptance-dialog.component";
import { PopupInformationComponent } from "./popup-information/popup-information.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { FooterComponent } from "./footer/footer.component";
import { BannerComponent } from "./banner/banner.component";
import { WidgetsComponent } from "./widgets/widgets.component";
import { FeatureArticlesComponent } from "./feature-articles/feature-articles.component";
import { NewsComponent } from "./news/news.component";
import { MatFormNequiDaviplataComponent } from "./mat-form-nequi-daviplata/mat-form-nequi-daviplata.component";
import { MenuProfileComponent } from "./menu-profile/menu-profile.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { MatCloseSessionDialogComponent } from "./mat-close-session-dialog/mat-close-session-dialog.component";
import { MatIconModule } from "@angular/material/icon";
import { MatConfirmAwardComponent } from "./mat-confirm-award/mat-confirm-award.component";
import { GtmDispatchEventsRepository } from "src/app/core/repositories/gtmDispatchEvent.repository";
import { GtmDispatchEventsService } from "src/app/infrastructure/services/gtm-dispatch-events.service";
import { AuthRepository } from "src/app/core/repositories/auth.repository";
import { AuthService } from "src/app/infrastructure/services/auth.service";



@NgModule({
  declarations: [
    MatConfirmDialogComponent,
    MatCloseSessionDialogComponent,
    PolicyAcceptanceDialogComponent,
    PopupInformationComponent,
    TopbarComponent,
    FooterComponent,
    BannerComponent,
    WidgetsComponent,
    NewsComponent,
    FeatureArticlesComponent,
    MatFormNequiDaviplataComponent,
    MenuProfileComponent,
    MatConfirmAwardComponent,
    SpinnerComponent
  ],
  exports: [
    MatConfirmDialogComponent,
    MatCloseSessionDialogComponent,
    PolicyAcceptanceDialogComponent,
    PopupInformationComponent,
    TopbarComponent,
    FooterComponent,
    BannerComponent,
    WidgetsComponent,
    NewsComponent,
    FeatureArticlesComponent,
    MatFormNequiDaviplataComponent,
    MenuProfileComponent,
    MatConfirmAwardComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule],
  providers: [
    { provide: GtmDispatchEventsRepository, useClass: GtmDispatchEventsService },
    { provide: AuthRepository, useClass: AuthService }

  ]
})
export class SharedModule { }
