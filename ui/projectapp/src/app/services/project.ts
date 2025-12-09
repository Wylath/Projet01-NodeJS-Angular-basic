/**
 * ProjectManager Service
 * 
 * Service central pour gérer les projets dans l'application.
 * 
 * Fonctions principales :
 * - getList(): récupère la liste des projets depuis l'API.
 * - addProject(project): ajoute un nouveau projet via l'API.
 * 
 * Expose également l'interface Project pour typer les objets projet.
 * 
 * Utilisation :
 *   this.projectManager.getList().subscribe(...);
 *   this.projectManager.addProject({ id: '1', desc: 'Mon projet' }).subscribe(...);
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  _id: string;
  id: string;
  desc: string;
}

// Pas utilisé
export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;  // hash en backend
}

@Injectable({
  providedIn: 'root'
})
export class ProjectManager {
  private url = 'http://localhost:5795/api/projectperso/getlist';
  private addUrl = 'http://localhost:5795/api/projectperso/add';

  constructor(private http: HttpClient) {}

  getList(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }

  addProject(project: { id: string; desc: string }): Observable<any> {
    return this.http.post(this.addUrl, project);
  }
}