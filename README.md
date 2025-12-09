# Projet01 - Node.js + Angular

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Angular](https://img.shields.io/badge/Angular-15+-red)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

## Description
Application web sur une seule page pour :  
- Gestion utilisateurs (inscription, connexion, JWT).  
- Ajout et affichage de projets depuis MongoDB.  
- Interface Angular simple et responsive.

## Structure
projet01/
├── api/ # Backend Node.js + Express
└── ui/projectapp/ # Frontend Angular

## Prérequis
- Node.js >= 18
- npm ou yarn
- MongoDB (local ou cloud)

## Installation rapide

### Backend
```bash
cd api
npm install
```
Créer un fichier .env :
```ini
JWT_SECRET=ton_secret
MONGO_URI=mongodb://...
```
Lancer le serveur :
```bash
node index.js
```
Port par défaut : 5795.
### Frontend
```bash
cd ui/projectapp
npm install
ng serve
```
Accessible sur http://localhost:4200.

## Fonctionnalités
Connexion / inscription avec JWT.

Affichage des projets depuis MongoDB.

Formulaire pour ajouter un projet.

Messages de confirmation et gestion de session.

## Notes
Le fichier .env est ignoré par Git.

SCSS utilisé pour le style.

Composant principal Angular App avec standalone: false.

ChangeDetectorRef utilisé pour forcer l’affichage après chargement de données.