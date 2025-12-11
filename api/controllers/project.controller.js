/**
 * Contrôleur des projets
 *
 * Rôle :
 * - Gérer l’accès aux données de la collection des projets.
 * - Fournir :
 *     • La liste complète des projets (getList)
 *     • L’ajout d’un projet (addProject)
 * - Valider les données reçues avant insertion.
 * - Logger les opérations importantes ou les erreurs.
 *
 * Contenu :
 * - Utilisation du client MongoDB centralisé.
 * - Deux fonctions exportées pour les routes du module projectperso.
 */

import client from "../db.js";
import logger from "../utils/logger.js";

const DB_NAME = process.env.DB_NAME;
const COLLECTION = "Projet perso";

export async function getProjectList(req, res) {
  try {
    const items = await client.db(DB_NAME).collection(COLLECTION).find({}).toArray();
    res.send(items);
  } catch (err) {
    logger.error(err);
    res.status(500).send("Erreur serveur");
  }
}

export async function addProject(req, res) {
  try {
    const { id, desc } = req.body;

    if (!id || !desc) {
      return res.status(400).send("id et desc sont requis");
    }

    const result = await client.db(DB_NAME).collection(COLLECTION).insertOne({ id, desc });

    //console.log('Nouvelle donnée reçue:', { id, desc }); // log dans le terminal
    logger.info(`Projet ajouté: ${JSON.stringify({ id, desc })}`);

    res.status(201).json({ success: true, insertedId: result.insertedId });
  } catch (err) {
    logger.error(err);
    res.status(500).send("Erreur serveur");
  }
}
