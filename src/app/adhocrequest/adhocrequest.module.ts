import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdhocrequestPage } from './adhocrequest.page';

const routes: Routes = [
  {
    path: '',
    component: AdhocrequestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdhocrequestPage]
})
export class AdhocrequestPageModule {}
