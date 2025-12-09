/**
 * AppRoutingModule
 * 
 * Module de routing principal de l'application Angular.
 * 
 * Rôle :
 * - Définir les routes de l'application si plusieurs pages/components étaient nécessaires.
 * - Dans ce projet "single-page", il n'y a pas de routes actives, mais le module est présent
 *   pour permettre une future extension vers du routing multi-page.
 * 
 * Utilisation :
 *   importé dans AppModule pour configurer le RouterModule.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
