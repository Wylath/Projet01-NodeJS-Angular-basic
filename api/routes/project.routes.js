/**
 * Routes des projets
 *
 * Rôle :
 * - Définir les endpoints liés aux projets :
 *     • GET /getlist
 *     • POST /add
 * - Faire le lien entre les requêtes Express et les fonctions du contrôleur.
 *
 * Contenu :
 * - Router Express pour le module projectperso.
 * - Import et utilisation des méthodes du contrôleur de projets.
 */
import { Router } from "express";
import { getProjectList, addProject } from "../controllers/project.controller.js";

const router = Router();

router.get("/getlist", getProjectList);
router.post("/add", addProject);

export default router;
