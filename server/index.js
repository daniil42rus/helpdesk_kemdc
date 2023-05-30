import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import applicationsRouter from './routes/applications.js';
import administratorsRouter from './routes/administrators.js';
import clientsRouter from './routes/clients.js';
import authRouter from './routes/auth.js';
import os from 'os'
// require("os").userInfo().username

console.log(os.userInfo().username);
const app = express();
dotenv.config();

//Middleware
app.use(cors());
app.use(express.json());

//Constatns
const URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT || 3001;

app.get('/', (req,res) => {
    return res.json({message:'all good'})
})

//Routes
app.use('/api/applications/', applicationsRouter);

app.use('/api/administrators/', administratorsRouter);
app.use('/api/clients/', clientsRouter);
app.use('/api/auth/', authRouter);

async function start() {
	try {
		await mongoose.connect(URL + DB_NAME);
		app.listen(DB_PORT, () =>
			console.log(`Server started on port: ${DB_PORT}`)
		);
	} catch (error) {
		console.log(error);
	}
}

start();
