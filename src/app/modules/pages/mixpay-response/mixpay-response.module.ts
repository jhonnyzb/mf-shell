import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MixpayResponseComponent } from "./mixpay-response.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule, NgClass } from "@angular/common";

const childRoutes: Routes = [
    {
        path: '',
        component: MixpayResponseComponent
    }
]

@NgModule({
    declarations: [
        MixpayResponseComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(childRoutes),
        NgClass
    ]
})
export class MixpayResponseModule { }
