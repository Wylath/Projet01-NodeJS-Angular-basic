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

const express = require('express')
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const winston = require('winston');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const USERS = "user";

const { nowTicks } = require("./utils/time");

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

app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send("Missing fields");
        }

        const db = client.db(DB_NAME);

        const existing = await db.collection(USERS).findOne({ email });

        if (existing) return res.status(409).send("Email already exists");

        const password_hash = await bcrypt.hash(password, 10);

        const ticks = nowTicks();

        // Si besoin de de récupérer les données et afficher en log :
        logger.info(`Nouveau enregistrement d'utilisateur: ${JSON.stringify({ username, email })}`);

        const result = await db.collection(USERS).insertOne({
            username,
            email,
            password_hash,
            created_at: ticks,
            updated_at: ticks,
            last_login_at: null
        });

        res.status(201).send({ success: true, id: result.insertedId });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const db = client.db(DB_NAME);

        const user = await db.collection(USERS).findOne({ email });

        if (!user) return res.status(404).send("User not found");

        const match = await bcrypt.compare(password, user.password_hash);

        if (!match) return res.status(401).send("Invalid credentials");

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );

        const ticks = nowTicks();

        // Si besoin de de récupérer les données et afficher en log :
        //logger.info(`Update utilisateur: ${JSON.stringify({ username: user.username, email: user.email })}`);

        await db.collection(USERS).updateOne(
            { _id: user._id },
            { $set: { 
                updated_at: ticks, 
                last_login_at: ticks 
            }}
        );

        res.send({ token, username: user.username });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
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

// installation de JWT pour l'access token dans le folder api : npm install bcrypt jsonwebtoken dotenv