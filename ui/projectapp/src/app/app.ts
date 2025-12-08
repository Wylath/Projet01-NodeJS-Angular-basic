import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Project, ProjectManager } from './services/project';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: false
})
export class App implements OnInit {

  items: Project[] = [];
  loading = true;
  error = false;

  newProject = { id: '', desc: '' };
  confirmation = ''; // message de confirmation

  constructor(private projectManager: ProjectManager, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectManager.getList().subscribe({
      next: data => {
        this.items = data;
        this.loading = false;
        this.cdr.detectChanges(); // force le rendu
        console.log('items après assignation:', this.items); // check sur la console que les datas sont load
      },
      error: (err) => {
        console.error(err);
        this.error = true;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit(): void {
    this.projectManager.addProject(this.newProject).subscribe({
      next: () => {
        this.newProject = { id: '', desc: '' }; // réinitialiser le formulaire
        this.confirmation = 'Projet ajouté avec succès !'; // message de confirmation
        this.loadProjects(); // recharge la liste
        // Supprime le message après 3 secondes
        setTimeout(() => {
          this.confirmation = '';
          this.cdr.detectChanges();
        }, 3000);
      },
      error: err => console.error('Erreur ajout projet:', err)
    });
  }
}