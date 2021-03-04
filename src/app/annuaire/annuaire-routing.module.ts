import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnuairePage } from './annuaire.page';

const routes: Routes = [
  {
    path: '',
    component: AnnuairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnuairePageRoutingModule {}
