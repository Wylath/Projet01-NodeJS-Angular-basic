/**
 * Serveur Node.js principal (Express + MongoDB)
 *
 * Rôle :
 * - Initialiser l'application Express.
 * - Charger la configuration CORS pour autoriser l'accès depuis Angular.
 * - Activer le parsing JSON des requêtes.
 * - Établir la connexion à MongoDB via le client centralisé.
 * - Monter les routes :
 *     • /api/projectperso → gestion des projets
 *     • /api/auth         → authentification (login / register)
 *
 * Contenu :
 * - Imports principaux (Express, CORS, MongoDB client).
 * - Initialisation Express et middlewares.
 * - Routing modulaire via les fichiers du dossier routes/.
 * - Lancement du serveur sur le port 5795.
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