function ClientDetailsQuestions(props) {
	let val = props.value.values;
	return (
		<div className="w-full">
			<input
				className="border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
				type="text"
				name={
					val?.ClientDetails ? "ClientDetails.PropertyType" : "PropertyType"
				}
				value={
					val?.ClientDetails ? val.ClientDetails.PropertyType : val.PropertyType
				}
				onChange={props.handleChange.handleChange}
				placeholder="Enter Type of Property"
			/>

			<input
				className="border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
				type="text"
				name={
					val?.ClientDetails ? "ClientDetails.BedsandBaths" : "BedsandBaths"
				}
				value={
					val?.ClientDetails ? val.ClientDetails.BedsandBaths : val.BedsandBaths
				}
				onChange={props.handleChange.handleChange}
				placeholder="How many bed and baths"
			/>
		</div>
	);
}

export default ClientDetailsQuestions;
