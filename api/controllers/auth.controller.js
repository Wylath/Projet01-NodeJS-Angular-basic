import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../db.js';
import logger from '../utils/logger.js';
import { nowTicks } from '../utils/time.js';

const DB_NAME = process.env.DB_NAME;
const USERS = 'user';

export async function registerUser(req, res) {
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

        const result = await db.collection(USERS).insertOne({
            username,
            email,
            password_hash,
            created_at: ticks,
            updated_at: ticks
        });

        // Enregistrement dans le log
        logger.info(`User created: ${username, email}`);
        res.status(201).send({ success: true, id: result.insertedId });

    } catch (err) {
        logger.error(err);
        res.status(500).send("Server error");
    }
}

export async function loginUser(req, res) {
    try {
        const { identifier, password } = req.body;
        
        const db = client.db(DB_NAME);
        const query = identifier.includes('@') ? { email: identifier } : { username: identifier };

        const user = await db.collection(USERS).findOne(query);
        if (!user) return res.status(404).send("User not found");

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return res.status(401).send("Invalid credentials");

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );

        const ticks = nowTicks();

        // Enregistrement dans le log
        logger.info(`User update: ${JSON.stringify({ username: user.username, email: user.email })}`);

        await db.collection(USERS).updateOne(
            { _id: user._id },
            { $set: { 
                updated_at: ticks, 
                last_login_at: ticks 
            }}
        );

        res.send({ token, username: user.username });

    } catch (err) {
        logger.error(err);
        res.status(500).send("Server error");
    }
}
