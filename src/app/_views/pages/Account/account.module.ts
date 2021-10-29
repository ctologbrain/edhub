import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { ComponentModule } from 'src/app/_components/component.module';
import { WishListComponent } from 'src/app/_components/wish-list/wish-list.component';
import { MyCoursesComponent } from 'src/app/_components/my-courses/my-courses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: 'wishlist', component: WishListComponent },
      { path: 'my-courses', component: MyCoursesComponent },
      { path: '', pathMatch: 'full', redirectTo: 'wishlist' },
    ],
  },
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AccountModule {}
