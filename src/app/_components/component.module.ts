import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    ProductFilterComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    ProductFilterComponent,
  ],
})
export class ComponentModule {}
