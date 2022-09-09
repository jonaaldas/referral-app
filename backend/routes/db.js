import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const mongodb = async () => {
	try {
		const db = mongoose.connect(process.env.URL);
	} catch (error) {
		console.error(error);
	}
};