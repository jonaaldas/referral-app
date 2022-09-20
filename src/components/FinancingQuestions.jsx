function FinancingQuestions(props) {
	let val = props.value.values;
	return (
		<div>
			<input
				className="border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
				type="text"
				name={
					val?.FinancingDetails ? "FinancingDetails.Financing" : "Financing"
				}
				value={
					val?.FinancingDetails ? val.FinancingDetails.Financing : val.Financing
				}
				onChange={props.handleChange.handleChange}
				placeholder="Enter Type of Financing"
			/>

			<input
				className="border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
				type="text"
				name={
					val?.FinancingDetails ? "FinancingDetails.LendersName" : "LendersName"
				}
				value={
					val?.FinancingDetails
						? val.FinancingDetails.LendersName
						: val.LendersName
				}
				onChange={props.handleChange.handleChange}
				placeholder="Enter Lenders Name"
			/>

			<input
				className="border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
				type="number"
				name={
					val?.FinancingDetails
						? "FinancingDetails.LendersPhoneNumber"
						: "LendersPhoneNumber"
				}
				value={
					val?.FinancingDetails
						? val.FinancingDetails.LendersPhoneNumber
						: val.LendersPhoneNumber
				}
				onChange={props.handleChange.handleChange}
				placeholder="Enter Lenders Phone Number"
			/>

			<input
				className="border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
				type="email"
				name={
					val?.FinancingDetails
						? "FinancingDetails.LendersEmail"
						: "LendersEmail"
				}
				value={
					val?.FinancingDetails
						? val.FinancingDetails.LendersEmail
						: val.LendersEmail
				}
				onChange={props.handleChange.handleChange}
				placeholder="Enter Lenders Email"
			/>
		</div>
	);
}

export default FinancingQuestions;
