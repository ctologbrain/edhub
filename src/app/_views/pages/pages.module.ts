import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { CompareComponent } from './compare/compare.component';
import { ComponentModule } from 'src/app/_components/component.module';
import { AuthGuard } from 'src/app/_core/guard/auth.guard';
import { CartComponent } from './cart/cart.component';
import { TechnologyComponent } from './technology/technology.component';

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
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'technology/:technology',
    component: TechnologyComponent,
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
  declarations: [
    HomeComponent,
    CompareComponent,
    CartComponent,
    TechnologyComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ComponentModule],
})
export class PagesModule {}
