import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../../shared/ui.module';
import { SharedModule } from '../../shared/shared.module';
import { PolicyRepository } from 'src/app/core/repositories/policy.repository';
import { PolicyService } from 'src/app/infrastructure/services/policy.service';
import { CatalogService } from 'src/app/infrastructure/services/valefiel/catalog.service';
import { CatalogRepository } from 'src/app/core/repositories/catalog.repository';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    SharedModule,
  ],
  providers :[
    { provide: PolicyRepository, useClass: PolicyService },
    { provide: CatalogRepository, useClass: CatalogService },
  ]
})
export class MainModule { }
