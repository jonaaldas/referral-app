import DashboardPage from "./pages/DashboardPage";
import InputPage from "./pages/InputPage";
import { Routes, Route } from "react-router-dom";
import EachClientInformation from "./pages/EachClientInformation";
import AuthPage from "./pages/AuthPage";

import NotesButtonPage from "../src/pages/NotesButtonPage";
import LandingPagePage from "./pages/LandingPagePage";
import { useReferralContext } from "./context/ReferalContext";

function App() {
	const { isSignUp } = useReferralContext();

	return (
		<Routes>
			<Route path="/" element={<LandingPagePage />} />
			{/* {isSignUp === false ? ( */}
			{/* <> */}
			<Route path="/auth" element={<AuthPage />} />
			{/* </> */}
			{/* ) : ( */}
			{/* <> */}
			<Route path="/dashboard" element={<DashboardPage />} />
			<Route path="/send-referral" element={<InputPage />} />
			<Route path="/edit-informatio/:id" element={<InputPage />} />
			<Route
				path="dashboard/client-information/:id"
				element={<EachClientInformation />}
			/>
			<Route path="/update-client-notes/:id" element={<NotesButtonPage />} />
			{/* </> */}
			{/* )} */}
		</Routes>
	);
}
export default App;
