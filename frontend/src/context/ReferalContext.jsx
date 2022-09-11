import { useState, createContext, useContext } from "react";
import data from "../referals.json";
import { v4 as uuidv4 } from "uuid";

export const ReferralContext = createContext();

export function useReferralContext() {
	const context = useContext(ReferralContext);
	return context;
}

function ReferalProvider({ children }) {
	// initial state for referrals
	const [referrals, setReferrals] = useState(data);
	// filtered referrals (seller and buyers)
	const [filteredReferrals, setFilteredReferrals] = useState([]);
	// flag to compare buttons
	const [activeButtons, setActiveButtons] = useState("");
	// flag for signed up
	const [isSignUp, setIsSingedUp] = useState(false);

	// add a note to referral profile
	const addNote = (note, params) => {
		let referralClient = referrals.filter((x) => {
			return x.id === params.id;
		});
		note.id = uuidv4();
		referralClient[0].notes.push(note);
		setReferrals((prevNotes) => [...prevNotes, referralClient]);
	};

	// delete Note
	const deleteNote = (id, params) => {
		let referralClient = referrals.filter((x) => {
			return x.id === params.id;
		});
		let x = referralClient[0].notes.filter((x) => x.id !== id);
		referralClient[0].notes = x;
		console.log(referralClient);
		setReferrals((prevNotes) => [...prevNotes, referralClient]);
	};

	// ==============Referral manipulation Crud =================
	// send a reffral
	const sendRefferal = (client) => {
		setReferrals((prevReferrals) => [...prevReferrals, client]);
	};

	// edit Referral
	const editReferralInformation = (client, id) => {
		setReferrals(
			referrals.map((clientReferral) =>
				clientReferral.id === id ? client : clientReferral
			)
		);
	};

	// get Single Referral to edit information
	const getSingleReferralToEdit = (id) => {
		return referrals.filter((referral) => referral.id === id)[0];
	};

	// delete referral Client
	const deleteReferralClient = (id) => {
		let referralClient = referrals.filter((x) => {
			return x.id !== id;
		});
		setReferrals(referralClient);
	};
	// ============== Referral manipulation Crud END =================

	return (
		<ReferralContext.Provider
			value={{
				referrals,
				filteredReferrals,
				activeButtons,
				isSignUp,
				setFilteredReferrals,
				setActiveButtons,
				addNote,
				deleteNote,
				sendRefferal,
				editReferralInformation,
				getSingleReferralToEdit,
				deleteReferralClient,
			}}
		>
			{children}
		</ReferralContext.Provider>
	);
}

export default ReferalProvider;
