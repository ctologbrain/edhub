import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { ComponentModule } from 'src/app/_components/component.module';

const routes: Routes = [{ path: '', component: ProfileComponent }];

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ComponentModule],
})
export class AccountModule {}
