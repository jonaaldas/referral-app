import { useState, createContext, useContext } from "react";
import data from "../referals.json";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import {
	logInUserRequest,
	registerUserRequest,
	getUserRequest,
} from "../api/userApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ReferralContext = createContext();

export function useReferralContext() {
	const context = useContext(ReferralContext);
	return context;
}

function ReferalProvider({ children }) {
	const navigate = useNavigate();
	// initial state for referrals
	const [referrals, setReferrals] = useState(data);
	// filtered referrals (seller and buyers)
	const [filteredReferrals, setFilteredReferrals] = useState([]);
	// flag to compare buttons
	const [activeButtons, setActiveButtons] = useState("");
	// flag for signed up
	const [isSignUp, setIsSingedUp] = useState(false);
	// user from backedn
	const [user, setUser] = useState("");

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

	// const register

	const registerUser = async (name, email, password) => {
		const res = await registerUserRequest(name, email, password);
		console.log(res);
		if (res?.response?.status === 400) {
			toast("User already Exists");
			navigate("/auth");
		} else if (res?.status === 201) {
			sessionStorage.setItem("user", JSON.stringify(res.data));
			navigate("/");
			setIsSingedUp((prevSignUp) => !prevSignUp);
			window.location.reload(false);
		}
	};

	const logOut = () => {
		sessionStorage.removeItem("user");
		navigate("/auth");
		window.location.reload(false);
	};

	const logIn = async (email, passowrd) => {
		const res = await logInUserRequest(email, passowrd);
		if (res?.response?.status === 401) {
			toast("Email or Passowrd are incorrect");
		} else if (res.status === 200) {
			sessionStorage.setItem("user", JSON.stringify(res.data));
			navigate("/");
			setIsSingedUp((prevSignUp) => !prevSignUp);
			window.location.reload(false);
		}
	};

	const getUser = async (token) => {
		const res = await getUserRequest(token);
		console.log(res);
	};
	useEffect(() => {
		if (!sessionStorage.getItem("user")) {
			navigate("/auth");
		} else {
			setUser(sessionStorage.getItem("user"));
		}
	}, [user]);

	return (
		<ReferralContext.Provider
			value={{
				referrals,
				filteredReferrals,
				activeButtons,
				isSignUp,
				setFilteredReferrals,
				setActiveButtons,
				setIsSingedUp,
				addNote,
				deleteNote,
				sendRefferal,
				editReferralInformation,
				getSingleReferralToEdit,
				deleteReferralClient,
				registerUser,
				logOut,
				logIn,
				user,
			}}
		>
			{children}
		</ReferralContext.Provider>
	);
}

export default ReferalProvider;
