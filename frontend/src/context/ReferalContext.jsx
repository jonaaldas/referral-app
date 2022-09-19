import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
	logInUserRequest,
	registerUserRequest,
	getUserRequest,
	forgotPasswordRequest,
	updatePasswordRequest,
} from "../api/userApi";
import {
	getAllReferralsRequest,
	createReferralsRequest,
	deleteReferralRequest,
	getOneReferralToEditRequest,
	editReferralRequest,
	addANoteRequest,
	deleteNoteRequest,
} from "../api/referralsApi";
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
	const [referrals, setReferrals] = useState([]);
	// filtered referrals (seller and buyers)
	const [filteredReferrals, setFilteredReferrals] = useState([]);
	// flag to compare buttons
	const [activeButtons, setActiveButtons] = useState("");
	// flag for signed up
	const [isSignUp, setIsSingedUp] = useState(false);
	// user from backedn
	const [user, setUser] = useState("");

	const dateTime = () => {
		const currentdate = new Date();
		return (
			currentdate.getMonth() +
			1 +
			"/" +
			currentdate.getDate() +
			"/" +
			currentdate.getFullYear() +
			" @ " +
			currentdate.getHours() +
			":" +
			currentdate.getMinutes() +
			":" +
			currentdate.getSeconds()
		);
	};

	// ==============Note manipulation Crud =================
	// add a note to referral profile
	const addNote = async (note, params) => {
		let userToken = JSON.parse(user);
		const res = await addANoteRequest(userToken.token, note, params.id);
		if (res.status === 200) {
			let referralClient = referrals.filter((x) => {
				return x._id === params.id;
			});
			referralClient[0].agentNotes.push(note);
			setReferrals((prevNotes) => [...prevNotes, referralClient]);
		}
	};

	// delete Note
	const deleteNote = async (notesId, params) => {
		let userToken = JSON.parse(user);
		const res = await deleteNoteRequest(userToken.token, notesId, params.id);
		if (res.status === 200) {
			let referralClient = referrals.filter((x) => {
				return x._id === params.id;
			});
			let x = referralClient[0].agentNotes.filter((x) => x._id !== notesId);
			referralClient[0].agentNotes = x;
			setReferrals((prevNotes) => [...prevNotes, referralClient]);
		}
	};
	// ============== Note manipulation Crud END =================

	// ==============Referral manipulation Crud =================
	// get all referrals
	const getAllReferralls = async (token) => {
		const res = await getAllReferralsRequest(token);
		setReferrals((prevReferrals) => [...prevReferrals, ...res.data]);
	};

	// send/add a new a reffral
	const sendRefferal = async (client) => {
		let userToken = JSON.parse(user);
		const res = await createReferralsRequest(userToken.token, client);
		setReferrals((prevReferrals) => [...prevReferrals, res.data]);
	};

	// edit Referral
	const editReferralInformation = async (client, id) => {
		let userToken = JSON.parse(user);
		const res = await editReferralRequest(userToken.token, client, id);
		setReferrals(
			referrals.map((clientReferral) =>
				clientReferral._id === id ? res.data : clientReferral
			)
		);
		toast("Referral has been updated");
	};

	// get Single Referral to edit information
	const getSingleReferralToEdit = async (id) => {
		let userToken = JSON.parse(user);
		const res = await getOneReferralToEditRequest(userToken.token, id);
		return res;
	};

	// delete referral Client
	const deleteReferralClient = async (id) => {
		let userToken = JSON.parse(user);
		const res = await deleteReferralRequest(userToken.token, id);
		if (res.status === 200) {
			toast("Referral Deleted");
			let referralClient = referrals.filter((x) => {
				return x._id !== id;
			});
			setReferrals(referralClient);
		}
	};
	// ============== Referral manipulation Crud END =================

	// ============== User functions start =================
	// const register

	const registerUser = async (name, email, password) => {
		const res = await registerUserRequest(name, email, password);
		if (res?.response?.status === 400) {
			toast("User already Exists");
			navigate("/auth");
		} else if (res?.status === 201) {
			localStorage.setItem("user", JSON.stringify(res.data));
			navigate("/");
			setIsSingedUp((prevSignUp) => !prevSignUp);
			window.location.reload(false);
		}
	};

	const logOut = () => {
		localStorage.removeItem("user");
		navigate("/auth");
		window.location.reload(false);
	};

	const logIn = async (email, passowrd) => {
		const res = await logInUserRequest(email, passowrd);
		if (res?.response?.status === 401) {
			toast("Email or Passowrd are incorrect");
		} else if (res.status === 200) {
			localStorage.setItem("user", JSON.stringify(res.data));
			navigate("/");
			setIsSingedUp((prevSignUp) => !prevSignUp);
			window.location.reload(false);
		}
	};

	// forgot password
	const forgotPassword = async (email) => {
		const res = await forgotPasswordRequest(email);
		console.log(res);
	};

	// update passowrd
	const updatePassowrd = async (password, token) => {
		const res = await updatePasswordRequest(password, token);
		console.log(res);
	};

	const getUser = async (token) => {
		return await getUserRequest(token);
	};

	// ============== User Functions Ends =================
	useEffect(() => {
		(async () => {
			if (localStorage.getItem("user")) {
				setUser(localStorage.getItem("user"));
				console.log("i am running");
				if (user && user !== "" && user !== undefined) {
					await getAllReferralls(JSON.parse(user).token);
				}
			}
		})();
	}, [user]);

	return (
		<ReferralContext.Provider
			value={{
				referrals,
				filteredReferrals,
				activeButtons,
				isSignUp,
				dateTime,
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
				forgotPassword,
				updatePassowrd,
				user,
			}}
		>
			{children}
		</ReferralContext.Provider>
	);
}

export default ReferalProvider;
