import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultipleTestsPage } from './multiple-tests.page';

const routes: Routes = [
  {
    path: '',
    component: MultipleTestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultipleTestsPageRoutingModule {}
