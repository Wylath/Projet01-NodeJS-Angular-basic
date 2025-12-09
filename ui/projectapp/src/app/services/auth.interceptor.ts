/**
 * AuthInterceptor
 * 
 * Intercepte toutes les requêtes HTTP sortantes.
 * 
 * - Ajoute automatiquement le token JWT (ou autre méthode d'authentification)
 *   dans l'en-tête Authorization pour les appels à l'API sécurisée.
 * - Peut gérer les réponses 401/403 pour rediriger vers le login.
 * 
 * Exemple d'utilisation :
 *   this.http.get('/api/protected') // l'interceptor ajoutera le token
 */

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    if (!token) {
      return next.handle(req);
    }
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(cloned);
  }
}