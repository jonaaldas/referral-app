import mongoose from "mongoose";

// let myDateString = new Date("<YYYY-mm-ddTHH:MM:ss>")

const referralSchema = mongoose.Schema({
	// user: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	required: true,
	// 	ref: 'User',
	// },
	referralType: {type: String, required: true},
	clientsName: {type: String, required: true},
	typeOfTransaction: {type: String, required: true},
	clientsPhoneNumber: {type: Number, required: true},
	clientsEmail: {type: String, required: true},
	closed: {type: Boolean, default: false},
	referredDate: { type: Date},
	realtorsName: {type: String, required: true},
	realtorsEmail: {type: String, required: true},
	realtorsPhone: {type: Number, required: true},
	ClientDetails: {
		PropertyType: {type: String},
		BedsandBaths: {type: String},
	},
	FinancingDetails: {
		Financing: {type: String},
		LendersName: {type: String},
		LendersPhoneNumber: {type: String},
		LendersEmail: {type: String},
	},
	agentNotes: [
		{
			note: {type: String},
			dateAdded: { type: Date },
		},
	],
})


export default mongoose.model('referralSchema', referralSchema)