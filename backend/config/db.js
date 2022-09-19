import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const mongodb = async () => {
	try {
		const conn = mongoose.connect('mongodb+srv://jonaaldas:Jonaaldas1995@cluster0.fskrsrj.mongodb.net/test');
    console.log(`MongoDB Connected`)
	} catch (error) {
		console.error(error);
	}
};