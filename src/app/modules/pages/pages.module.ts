import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PagesRoutingModule } from "./pages.routing.module";
import { MainModule } from "./main/main.module";
import { UiModule } from "../shared/ui.module";
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MainModule,
    UiModule,
    SharedModule,
  ]
})
export class PagesModule { }
