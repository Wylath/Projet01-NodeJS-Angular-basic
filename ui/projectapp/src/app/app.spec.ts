/**
 * App Component Tests
 * 
 * Contient les tests unitaires pour le composant App.
 * 
 * Rôle :
 * - Vérifie que le composant App peut être créé correctement.
 * - Prépare le terrain pour tester les interactions avec AuthService et ProjectManager.
 * 
 * Exemple de test :
 *   expect(component).toBeTruthy();
 * 
 * Utilisation :
 *   ng test -- pour exécuter les tests unitaires
 */

import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        App
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, projectapp');
  });
});
