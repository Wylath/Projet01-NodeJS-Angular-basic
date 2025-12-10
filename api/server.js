/**
 * Serveur Node.js principal (Express + MongoDB)
 * 
 * Rôle :
 * - Configurer le serveur Express sur le port 5795
 * - Gérer les routes API pour le projet perso :
 *   - GET /api/projectperso/getlist : récupérer la liste des projets
 *   - POST /api/projectperso/add : ajouter un nouveau projet
 * - Connecter à MongoDB via MongoClient
 * - Configurer CORS pour permettre les requêtes depuis l'application Angular
 * - Logger les erreurs et succès pour faciliter le debug côté serveur
 * 
 * Structure :
 * - import des modules (express, mongodb, cors)
 * - middleware (express.json(), cors)
 * - routes API
 * - écoute du port
 */

import express from "express";
import cors from "cors";
import client from "./db.js";

import projectRoutes from "./routes/project.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:4200", credentials: true }));

app.use("/api/projectperso", projectRoutes);
app.use("/api/auth", authRoutes);

app.listen(5795, async () => {
  try {
    await client.connect();
    console.log("Connexion MongoDB OK");
  } catch (err) {
    console.error("Erreur connexion MongoDB", err);
  }
});