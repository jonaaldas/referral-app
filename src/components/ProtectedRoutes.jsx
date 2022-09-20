import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
	const auth = false;
	if (!localStorage.getItem("user")) {
		return auth;
	} else {
		return !auth;
	}
};

function ProtectedRoutes() {
	const isAuth = useAuth();
	return isAuth ? <Outlet /> : <Navigate to="/auth" />;
}

export default ProtectedRoutes;
