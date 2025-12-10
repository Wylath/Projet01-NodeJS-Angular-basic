/**
 * Rôle :
 * - Fournir des utilitaires liés au temps pour le projet.
 * - Principalement utilisé pour générer des timestamps numériques correspondant à 
 *   la date et l'heure actuelles sous forme de ticks (nombre entier de 100 nanosecondes depuis le 1er janvier 0001).
 * 
 * Fonction principale :
 * - nowTicks(): renvoie un entier représentant la date/heure actuelle en ticks.
 * 
 * Utilisation :
 *   const ticks = nowTicks();
 *   console.log("Timestamp actuel en ticks :", ticks);
 * 
 * Remarque :
 * - Ces ticks sont utilisés pour les champs created_at, updated_at et last_login_at
 *   afin d’assurer une cohérence et un format entier dans la base de données.
 */
/**
 * Retourne un timestamp "type Windows Ticks"
 * 1 tick = 100 nanosecondes
 * Base = 01/01/0001 (différente d'un timestamp Unix)
 *
 * Exemple d'utilisation :
 *   const ticks = nowTicks();
 */

export function nowTicks() {
  const unixMillis = Date.now();
  const epochOffset = 62135596800000; // Différence entre Unix epoch et Windows epoch
  return (unixMillis + epochOffset) * 10000;
}

/**
 * Formatte une date lisible pour les logs
 * Exemple : 2025-02-15 18:42:01
 */
export function formatDate(date = new Date()) {
  return date.toISOString().replace("T", " ").substring(0, 19);
}
