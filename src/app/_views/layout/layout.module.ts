import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
];

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class LayoutModule {}
