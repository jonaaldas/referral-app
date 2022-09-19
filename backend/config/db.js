import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const mongodb = async () => {
	try {
		const conn = mongoose.connect(`${process.env.URL}`);
    console.log(`MongoDB Connected`)
	} catch (error) {
		console.error(error);
	}
};