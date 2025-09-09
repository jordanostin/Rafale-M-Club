import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

import articleRoutes from './routes/articleRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';


dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_DB_URL);


mongoose.connection.on("error", () => {
    console.log("Erreur lors de la connexion à la base de données");
})

mongoose.connection.on("open", () => {
    console.log("Connexion à la base de donénes établie");

    app.use('/api/articles', articleRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/auth', authRoutes);
    
})



app.listen(PORT, () => {
  console.log(`Backend en route sur http://localhost:${PORT}`);
});