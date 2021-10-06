import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ComponentModule } from 'src/app/_components/component.module';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: ':subcategory', component: ProductsComponent },
  { path: ':subcategory/:course', component: ProductsComponent },
  { path: ':subcategory/:course/:coursename', component: DetailComponent },
];

@NgModule({
  declarations: [ProductsComponent, DetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ComponentModule],
})
export class ProductsModule {}
