/**
 * ProjectManager Service Tests
 * 
 * Contient les tests unitaires pour le service ProjectManager.
 * 
 * Utilisation principale :
 * - Vérifie que le service ProjectManager peut être créé correctement.
 * - Prépare le terrain pour tester les appels HTTP via HttpClientTestingModule.
 * 
 * Exemple de test :
 *   expect(service).toBeTruthy();
 * 
 * Ce fichier est utilisé uniquement pour le développement et l'intégration continue.
 */

import { ProjectManager } from './project';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProjectManager', () => {
  let service: ProjectManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectManager]
    });
    service = TestBed.inject(ProjectManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});