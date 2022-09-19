import { useReferralContext } from "../context/ReferalContext";
function StandardNavMenu() {
	const { logOut, user } = useReferralContext();
	return (
		<header className="bg-gray-900">
			<div className="flex items-center h-16 max-w-screen-xl gap-8 px-4 mx-auto sm:px-6 lg:px-8">
				<a className="block text-slate-50" href="/">
					<span className="sr-only">Home</span>
					<h1>REFERAL.IO</h1>
				</a>

				<div className="flex items-center justify-end flex-1 ">
					<h3 className=" text-slate-50 flex items-center gap-4 px-2">
						{user ? `Hi, ${JSON.parse(user).name}` : null}
					</h3>
					{user ? (
						<button
							className="inline-flex items-center justify-center px-3 py-1 bg-blue-500 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-blue-700 active:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 disabled:opacity-25 transition"
							onClick={logOut}
						>
							Log Out
						</button>
					) : null}
				</div>
			</div>
		</header>
	);
}

export default StandardNavMenu;
