import { Link } from "react-router-dom";
import { logOutUser } from "../api/userApi";
import { useReferralContext } from "../context/ReferalContext";

function StandardNavMenu() {
	const { isSignUp, logOut } = useReferralContext();

	const checkForUser = (user) => {
		if (user) {
			return (
				<>
					<h3 className="text-white">Hi, {user.name}</h3>{" "}
					<button
						className="inline-block  border border-black-600 rounded hover:bg-green-600 hover:text-white active:bg-green-500 focus:outline-none focus:ring className='inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg'"
						onClick={() => logOut()}
					>
						LogOut
					</button>
				</>
			);
		} else {
			return (
				<Link to="/auth">
					<button className="inline-block  border border-black-600 rounded hover:bg-green-600 hover:text-white active:bg-green-500 focus:outline-none focus:ring className='inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg'">
						Log in
					</button>
				</Link>
			);
		}
	};
	return (
		<header className="bg-gray-900">
			<div className="flex items-center h-16 max-w-screen-xl gap-8 px-4 mx-auto sm:px-6 lg:px-8">
				<div className="block text-teal-300" href="/">
					<span className="sr-only">Home</span>
					<Link to="/dashboard">
						<h1>REFERAL.IO</h1>
					</Link>
				</div>

				<div className="flex items-center justify-end flex-1 md:justify-between">
					<nav className="hidden md:block" aria-labelledby="header-navigation">
						<h2 className="sr-only" id="header-navigation">
							Header navigation
						</h2>
					</nav>

					<div>{checkForUser(isSignUp)}</div>
				</div>
			</div>
		</header>
	);
}

export default StandardNavMenu;
