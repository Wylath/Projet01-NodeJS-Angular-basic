/**
 * Routes d’authentification
 *
 * Rôle :
 * - Définir les points d'accès HTTP liés à l’authentification :
 *     • POST /register
 *     • POST /login
 * - Déléguer toute la logique au contrôleur d’authentification.
 *
 * Contenu :
 * - Router Express dédié au module auth.
 * - Association des routes aux fonctions du contrôleur.
 */
import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
