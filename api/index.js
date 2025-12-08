const express = require('express')
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const winston = require('winston');

//Création d'un log d'erreur en plus de la console installer avec npm install winston dans le dossier api
const logger = winston.createLogger({
  level: 'info',
 format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),  // toujours dans le terminal
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // erreurs
    new winston.transports.File({ filename: 'combined.log' })               // tout
  ]
});

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200', // mon Angular
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

//Log et mdp vers mongodb avec le nom du cluster
const client = new MongoClient("");

const DB_NAME = "projectperso";
const COLLECTION = "Projet perso";

// Route GET
app.get('/api/projectperso/getlist', async (req, res) => {
    try {
        const item = await client
            .db(DB_NAME)
            .collection(COLLECTION)
            .find({})
            .toArray();

        res.send(item);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
});

// Route POST
app.post('/api/projectperso/add', async (req, res) => {
  try {
    const { id, desc } = req.body;
    //console.log('Nouvelle donnée reçue:', { id, desc }); // log dans le terminal
    logger.info(`Nouvelle donnée reçue: ${JSON.stringify({ id, desc })}`);

    if (!id || !desc) {
      return res.status(400).send('id et desc sont requis');
    }

    const result = await client.db(DB_NAME).collection(COLLECTION).insertOne({ id, desc });
    //console.log('Projet inséré dans MongoDB:', result.insertedId); // log l’ID MongoDB
    logger.info(`Projet inséré avec l'ID: ${result.insertedId}`);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    logger.error(err);
    res.status(500).send("Erreur serveur");
  }
});

// Lancer le serveur
app.listen(5795, async () => {
    try {
        await client.connect();
        console.log("Connexion OK");
    } catch (err) {
        console.error(err);
    }
});

// aller voir la liste de la db qui est sur le site de mongodb
// url -> localhost:5795/api/projectperso/getlist
// node index.js pour lancer la connection avec l'app express, pour fermer dans le terminal : ctrl + c

// video guide : https://www.youtube.com/watch?v=JUwYy-WwHuQ