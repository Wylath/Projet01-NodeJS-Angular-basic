/**
 * AuthGuard
 * 
 * Sert à protéger certaines routes dans l'application Angular.
 * 
 * - Vérifie si l'utilisateur est authentifié (via AuthService).
 * - Empêche l'accès aux routes sécurisées si l'utilisateur n'est pas connecté.
 * - Peut rediriger vers la page de login si nécessaire.
 * 
 * Utilisation typique :
 *   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
 */
import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  // non connecté → redirect to root (ou login)
  router.navigate(['/']);
  return false;
};
