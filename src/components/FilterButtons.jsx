import { useEffect } from "react";
import { useReferralContext } from "../context/ReferalContext";

function FilterButtons() {
	const { referrals, setFilteredReferrals, activeButtons, setActiveButtons } =
		useReferralContext();
	useEffect(() => {
		if (activeButtons === "") {
			setFilteredReferrals(referrals);
			return;
		}
		const filter = referrals.filter((x) => x.referralType === activeButtons);
		setFilteredReferrals(filter);
	}, [activeButtons, setFilteredReferrals, referrals]);

	return (
		<div>
			<button
				className="inline-block  border border-black-600 hover:bg-blue-600 hover:text-white active:bg-blue-500 focus:outline-none focus:ring className='inline-block px-5 py-3  text-sm font-medium text-white bg-blue-500 rounded-lg"
				onClick={() => setActiveButtons("")}
			>
				All
			</button>

			<button
				className="inline-block  border border-black-600 hover:bg-blue-600 hover:text-white active:bg-blue-500 focus:outline-none focus:ring className='inline-block px-5 py-3  text-sm font-medium text-white bg-blue-500 rounded-lg"
				onClick={() => setActiveButtons("sent")}
			>
				Sent
			</button>

			<button
				className="inline-block  border border-black-600 hover:bg-blue-600 hover:text-white active:bg-blue-500 focus:outline-none focus:ring className='inline-block px-5 py-3  text-sm font-medium text-white bg-blue-500 rounded-lg"
				onClick={() => setActiveButtons("recieved")}
			>
				Recieved
			</button>
		</div>
	);
}

export default FilterButtons;
