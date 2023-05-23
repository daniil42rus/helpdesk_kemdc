import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import applicationsRouter from './routes/applications.js';

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
