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
import UpdateForgotPasswordPage from "./pages//UpdateForgotPasswordPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
function App() {
	return (
		<ReferalContainer>
			<Routes>
				<Route exact path="/auth" element={<AuthPage />} />
				<Route exact path="/forgot" element={<UpdateForgotPasswordPage />} />
				<Route
					exact
					path="/update-password/:token"
					element={<UpdateForgotPasswordPage />}
				/>
				<Route element={<ProtectedRoutes />}>
					<Route exact path="/" element={<DashboardPage />} />
					<Route exact path="/send-referral" element={<InputPage />} />
					<Route exact path="/edit-informatio/:id" element={<InputPage />} />
					<Route
						exact
						path="/client-information/:id"
						element={<EachClientInformation />}
					/>
					<Route
						exact
						path="/update-client-notes/:id"
						element={<NotesButtonPage />}
					/>
				</Route>
			</Routes>
			<ToastContainer />
		</ReferalContainer>
	);
}
export default App;
