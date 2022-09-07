import { TiZoom } from "react-icons/ti";
import { useReferralContext } from "../context/ReferalContext";
function SearchBar() {
	const { referrals, setFilteredReferrals } = useReferralContext();
	let keys = [
		"clientsName",
		"typeOfTransaction",
		"clientsPhoneNumber",
		"clientsEmail",
		"realtorsName",
		"realtorsEmail",
		"realtorsPhone",
	];
	const handleChange = (e) => {
		let query = e.target.value.toLowerCase();

		let searchFilteredReferrals = referrals.filter((referralClient) =>
			keys.some((key) => referralClient[key].toLowerCase().includes(query))
		);
		setFilteredReferrals(searchFilteredReferrals);
	};

	return (
		<div className="relative">
			<span className="absolute inset-y-0 inline-flex items-center right-4">
				<TiZoom />
			</span>
			<input
				type="text"
				className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
				placeholder="Enter a name?"
				onChange={(e) => handleChange(e)}
			/>
		</div>
	);
}

export default SearchBar;
