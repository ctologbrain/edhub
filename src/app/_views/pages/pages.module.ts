import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { CompareComponent } from './compare/compare.component';
import { ComponentModule } from 'src/app/_components/component.module';
import { AuthGuard } from 'src/app/_core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'compare',
    component: CompareComponent,
  },
  {
    path: 'account',
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./Account/account.module').then((m) => m.AccountModule),
  },
  {
    path: ':category',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
];

@NgModule({
  declarations: [HomeComponent, CompareComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ComponentModule],
})
export class PagesModule {}
