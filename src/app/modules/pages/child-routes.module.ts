import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FastMenuGuard } from 'src/app/core/guardians/fast-menu.guard';

const childRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'missions',
    loadChildren: () => import('Missions/MissionsModule').then((m) => m.MissionsModule),
    canActivate: [FastMenuGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('Account/AccountModule').then((m) => m.AccountModule),
  },
  {
    path: 'catalog',
    loadChildren: () => import('Catalog/CatalogModule').then((m) => m.CatalogModule),
    data: { breadcrumb: { alias: "catalog" } },
    canActivate: [FastMenuGuard]
  },
  {
    path: 'redeem',
    loadChildren: () => import('Redeem/RedeemModule').then((m) => m.RedeemModule),
    data: { title: 'Productos agregados' }
  },
  {
    path: 'pay',
    loadChildren: () => import('Redeem/PayModule').then((m) => m.PayModule),
    canActivate: [FastMenuGuard]
  },
  {
    path: 'content',
    loadChildren: () => import('Content/FaqModule').then(m => m.FaqModule)
  },
  {
    path: 'widgets',
    loadChildren: () => import('Content/WidgetsModule').then(m => m.WidgetsModule)
  },
  {
    path: 'mecanica',
    loadChildren: () => import('Content/MecanicaModule').then(m => m.MecanicaModule),
    canActivate: [FastMenuGuard]
  },
  {
    path: "newsList",
    loadChildren: () => import("Content/NewsListModule").then((m) => m.NewsListModule),
    canActivate: [FastMenuGuard]
  }
  ,
  {
    path: 'dashboard',
    loadChildren: () => import('ValeproDashboards/DasboardModule').then((m) => m.DasboardModule)
  },
]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
