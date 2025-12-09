/**
 * AuthService
 * 
 * Service central pour gérer l'authentification de l'utilisateur.
 * 
 * Fonctions principales :
 * - login(credentials): appelle l'API pour connecter l'utilisateur.
 * - register(user): crée un nouveau compte utilisateur via l'API.
 * - logout(): supprime le token et les infos de session côté client.
 * - isAuthenticated(): vérifie si l'utilisateur est connecté (token valide côté client).
 * - getUsername(): retourne le nom d'utilisateur actuel si connecté.
 * 
 * Peut également gérer la persistance du token (localStorage / cookie httpOnly)
 * et l'expiration côté client.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBase = 'http://localhost:5795/api/auth';
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';

  constructor(private http: HttpClient) {}

  // Enregistrement de l'utilisateur
  register(payload: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiBase}/register`, payload);
  }

  // Login de l'utilisateur
  login(payload: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string; username?: string }>(`${this.apiBase}/login`, payload)
      .pipe(
        tap(res => {
          if (res && res.token) {
            this.setToken(res.token);
            if (res.username) this.setUsername(res.username);
          }
        })
      );
  }

  // Supprime les tokenskey et userkey du localstorage
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  // Vérifie si l'utilisateur est logger
  isLoggedIn(): boolean {
    const tk = this.getToken();
    // simple check presence; compléter avec vérif expiration du JWT si besoin
    return !!tk;
  }

  // Vérifie si l'utilisateur est connecté et vérifie la date d'expiration de l'authentification
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Optionnel : si on stocke la date d'expiration en ms
    const exp = Number(localStorage.getItem('auth_exp') || 0);
    if (exp && Date.now() > exp) {
      this.logout();
      return false;
    }

    return true;
  }

  // Retourne le token enregistrer dans le localstorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Enregistre le token dans le localstorage
  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Retourne l'userkey et username enregistrer dans le localstorage
  getUsername(): string | null {
    return localStorage.getItem(this.userKey);
  }

  // Enregistre l'userkey et username dans le localstorage
  private setUsername(username: string) {
    localStorage.setItem(this.userKey, username);
  }
}