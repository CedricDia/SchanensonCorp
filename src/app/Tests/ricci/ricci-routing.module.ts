import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RicciPage } from './ricci.page';

const routes: Routes = [
  {
    path: '',
    component: RicciPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RicciPageRoutingModule {}
