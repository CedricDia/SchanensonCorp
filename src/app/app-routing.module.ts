import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'connexion',
    loadChildren: () => import('./connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  {
    path: 'annuaire',
    loadChildren: () => import('./annuaire/annuaire.module').then( m => m.AnnuairePageModule)
  },
  {
    path: 'global',
    loadChildren: () => import('./Tests/global/global.module').then( m => m.GlobalPageModule)
  },
  {
    path: 'ricci',
    loadChildren: () => import('./Tests/ricci/ricci.module').then( m => m.RicciPageModule)
  },
  {
    path: 'multiple-tests',
    loadChildren: () => import('./Tests/multiple-tests/multiple-tests.module').then( m => m.MultipleTestsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
