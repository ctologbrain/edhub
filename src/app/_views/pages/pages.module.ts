import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './Account/profile/profile.component';
import { CompareComponent } from './compare/compare.component';
import { ComponentModule } from 'src/app/_components/component.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'compare',
    component: CompareComponent,
  },
];

@NgModule({
  declarations: [HomeComponent, ProfileComponent, CompareComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ComponentModule],
})
export class PagesModule {}
