/**
 * Configuration MongoDB
 *
 * Rôle :
 * - Charger automatiquement les variables d’environnement (.env).
 * - Préparer un client MongoClient configuré avec l’URI fournie.
 * - Centraliser l’accès à MongoDB pour le reste de l’application.
 * - Éviter la création multiple de clients en exportant une seule instance.
 *
 * Contenu :
 * - Lecture de l’URI MongoDB via MONGO_URI.
 * - Initialisation d’un client MongoClient.
 * - Export du client pour les contrôleurs et routes.
 *
 * Remarque :
 * - La sélection de la base se fait directement dans les contrôleurs
 *   via client.db(process.env.DB_NAME).
 */
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

export default client;
