import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { RouterModule } from '@angular/router';
import { WishListComponent } from './wish-list/wish-list.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    ProductFilterComponent,
    WishListComponent,
    MyCoursesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSliderModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    ProductFilterComponent,
    WishListComponent,
    MyCoursesComponent,
  ],
})
export class ComponentModule {}
