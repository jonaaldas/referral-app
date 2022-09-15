import { useState, createContext, useContext } from "react";
import data from "../referals.json";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import {
	logInUserRequest,
	registerUserRequest,
	getUserRequest,
} from "../api/userApi";
import {
	getAllReferralsRequest,
	createReferralsRequest,
	deleteReferralRequest,
	getOneReferralToEditRequest,
	editReferralRequest,
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

	// ==============Note manipulation Crud =================
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
		console.log(res);
		setReferrals((prevReferrals) => [...prevReferrals, res.data]);
	};

	// edit Referral
	const editReferralInformation = async (client, id) => {
		let userToken = JSON.parse(user);
		const res = await editReferralRequest(userToken.token, client, id);
		console.log(res);
		setReferrals(
			referrals.map((clientReferral) =>
				clientReferral._id === id ? res.data : clientReferral
			)
		);
	};

	// get Single Referral to edit information
	const getSingleReferralToEdit = async (id) => {
		let userToken = JSON.parse(user);
		const res = await getOneReferralToEditRequest(userToken.token, id);
		console.log(res);
		return res;
		// referrals.filter((referral) => referral.id === id)[0];
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

	// const register

	const registerUser = async (name, email, password) => {
		const res = await registerUserRequest(name, email, password);
		console.log(res);
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

	const getUser = async (token) => {
		const res = await getUserRequest(token);
		// console.log(res);
	};
	useEffect(() => {
		(async () => {
			if (!localStorage.getItem("user")) {
				navigate("/auth");
			} else {
				setUser(localStorage.getItem("user"));
				console.log("i am running");
				if (user && user !== "" && user !== undefined) {
					await getAllReferralls(JSON.parse(user).token);
					// console.log(JSON.parse(user).token);
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
