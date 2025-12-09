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
function nowTicks() {
    return (Date.now() * 10000) + 621355968000000000;
}

module.exports = { nowTicks };