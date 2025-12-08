import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  _id: string;
  id: string;
  desc: string;
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