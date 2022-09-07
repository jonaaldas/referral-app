function ClientDetailsQuestions(props) {
	let val = props.value.values;
	return (
		<div className="w-full">
			<input
				className="border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
				type="text"
				name="ClientDetails.PropertyType"
				value={val.ClientDetails.PropertyType}
				onChange={props.handleChange.handleChange}
				placeholder="Enter Type of Property"
			/>

			<input
				className="border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
				type="text"
				name="ClientDetails.BedsandBaths"
				value={val.ClientDetails.BedsandBaths}
				onChange={props.handleChange.handleChange}
				placeholder="How many bed and baths"
			/>
		</div>
	);
}

export default ClientDetailsQuestions;
