import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyapprvaldashboardPage } from './myapprvaldashboard.page';

const routes: Routes = [
  {
    path: '',
    component: MyapprvaldashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyapprvaldashboardPage]
})
export class MyapprvaldashboardPageModule {}
