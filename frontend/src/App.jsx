import "./index.css";
import DashboardPage from "./pages/DashboardPage";
import InputPage from "./pages/InputPage";
import { Routes, Route } from "react-router-dom";
import EachClientInformation from "./pages/EachClientInformation";
import NotesButtonPage from "./pages/NotesButtonPage";
import AuthPage from "./pages/AuthPage";
import ReferalContainer from "./context/ReferalContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
	return (
		<ReferalContainer>
			<Routes>
				<Route path="/" element={<DashboardPage />} />
				<Route path="/auth" element={<AuthPage />} />
				<Route path="/send-referral" element={<InputPage />} />
				<Route path="/edit-informatio/:id" element={<InputPage />} />
				<Route
					path="/client-information/:id"
					element={<EachClientInformation />}
				/>
				<Route path="/update-client-notes/:id" element={<NotesButtonPage />} />
			</Routes>
			<ToastContainer />
		</ReferalContainer>
	);
}
export default App;
