/**
 * App Component
 * 
 * Composant principal de l'application Angular.
 * 
 * Rôle :
 * - Gérer l'affichage de l'interface unique (login, inscription, liste de projets).
 * - Interagir avec les services AuthService et ProjectManager.
 * - Contrôler l'état de l'application (chargement, erreurs, confirmation, utilisateur connecté).
 * - Mettre à jour dynamiquement le DOM via ChangeDetectorRef pour gérer les chargements et les messages.
 * 
 * Fonctions principales :
 * - ngOnInit(): charge la liste de projets et vérifie la session utilisateur.
 * - loadProjects(): récupère les projets depuis l'API.
 * - onSubmit(): ajoute un nouveau projet et recharge la liste.
 * - login(), register(), logout(): gestion de l'authentification.
 * - showLogin(), showApp(): contrôle de l'affichage selon l'état de connexion.
 */

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './services/auth.service';
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

  // Login/Register variables
  loginIdentifier = "";
  loginPassword = "";

  newUser = { username: "", email: "", password: "" };

  loggedIn = false;
  currentUser = "";

  showRegisterForm = false; // contrôle affichage formulaire inscription

  constructor(private auth: AuthService, private projectManager: ProjectManager, private cdr: ChangeDetectorRef) {
    this.currentUser = this.auth.getUsername() || '';
  }

  ngOnInit(): void {
    this.loadProjects();

    // Check expiration toutes les 5 sec
    setInterval(() => {
      if (!this.auth.isAuthenticated() && this.loggedIn) {
        this.logout();
        this.confirmation = 'Session expirée, connectez-vous à nouveau.';
        this.cdr.detectChanges();
      }
    }, 5000);

    if (this.auth.isAuthenticated()) {
      this.loggedIn = true;
      this.loadProjects();
    }
  }

  // Chargement de la liste des projets
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

  // Envoie des données du nouveau projet
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

  toggleRegisterForm(): void {
    this.showRegisterForm = !this.showRegisterForm;
    this.confirmation = '';
  }

  //Login de l'user
  login(): void {
    this.auth.login({ identifier: this.loginIdentifier, password: this.loginPassword }).subscribe({
      next: () => {
        this.loggedIn = true;
        this.currentUser = this.auth.getUsername() || this.loginIdentifier;
        this.confirmation = 'Connecté !';
        this.loadProjects();
        setTimeout(() => { this.confirmation = ''; }, 3000);
      },
      error: () => {
        this.loggedIn = false;
        this.confirmation = 'Erreur lors de la connexion.';
        setTimeout(() => { this.confirmation = ''; }, 3000);
      }
    });
  }

  // Enregistrement du nouveau user
  register(): void {
    this.auth.register(this.newUser).subscribe({
      next: () => {
        this.confirmation = 'Compte créé, connectez-vous.';
        this.newUser = { username: '', email: '', password: '' };
        this.showRegisterForm = false; // retour automatique au login
        setTimeout(() => { this.confirmation = ''; }, 3000);
      },
     error: () => {
        this.confirmation = 'Erreur lors de l’inscription.';
        setTimeout(() => { this.confirmation = ''; }, 3000);
      }
    });
  }

  // Déconnexion de l'user
  logout(): void {
    this.auth.logout();
    this.currentUser = '';
    this.loggedIn = false;
  }

  // Vérifie que l'user n'est pas connecté
  showLogin(): boolean {
    return !this.auth.isAuthenticated() && !this.showRegisterForm;
  }

   showRegister(): boolean {
    return !this.auth.isAuthenticated() && this.showRegisterForm;
  }

  // Vérifie que l'user est bien connecté
  showApp(): boolean {
    return this.auth.isAuthenticated();
  }
}