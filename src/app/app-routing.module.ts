import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./modules/pages/pages.module').then((m) => m.PagesModule),
    data: { breadcrumb: { alias: 'main'},},
  },
  {
    path: 'mixpayresponse',
    loadChildren: () =>
      import('./modules/pages/mixpay-response/mixpay-response.module').then(m => m.MixpayResponseModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('Authorizer/AuthorizerModule').then(m => m.AuthorizerModule),
  },
  { path: "**", redirectTo: "/main", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
