function FinancingQuestions(props) {
	let val = props.value.values;
	return (
		<div>
			<input
				className="border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
				type="text"
				name="FinancingDetails.Financing"
				value={val.FinancingDetails.Financing}
				onChange={props.handleChange.handleChange}
				placeholder="Enter Type of Financing"
			/>

			<input
				className="border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
				type="text"
				name="FinancingDetails.LendersName"
				value={val.FinancingDetails.LendersName}
				onChange={props.handleChange.handleChange}
				placeholder="Enter Lenders Name"
			/>

			<input
				className="border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
				type="number"
				name="FinancingDetails.LendersPhoneNumber"
				value={val.FinancingDetails.LendersPhoneNumber}
				onChange={props.handleChange.handleChange}
				placeholder="Enter Lenders Phone Number"
			/>

			<input
				className="border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
				type="email"
				name="FinancingDetails.LendersEmail"
				value={val.FinancingDetails.LendersEmail}
				onChange={props.handleChange.handleChange}
				placeholder="Enter Lenders Email"
			/>
		</div>
	);
}

export default FinancingQuestions;
