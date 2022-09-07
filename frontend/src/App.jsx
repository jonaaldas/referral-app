import "./index.css";
import DashboardPage from "./pages/DashboardPage";
import InputPage from "./pages/InputPage";
import { Routes, Route } from "react-router-dom";
import EachClientInformation from "./pages/EachClientInformation";
import NotesButtonPage from "../src/pages/NotesButtonPage";
import ReferalContainer from "./context/ReferalContext";

function App() {
	return (
		<ReferalContainer>
			<Routes>
				<Route path="/" element={<DashboardPage />} />
				<Route path="/send-referral" element={<InputPage />} />
				<Route path="/edit-informatio/:id" element={<InputPage />} />
				<Route
					path="/client-information/:id"
					element={<EachClientInformation />}
				/>
				<Route path="/update-client-notes/:id" element={<NotesButtonPage />} />
			</Routes>
		</ReferalContainer>
	);
}
export default App;
