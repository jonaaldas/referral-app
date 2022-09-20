function AuthInputs({
	id,
	type,
	name,
	value,
	onChange,
	nameOfLabel,
	placeholder,
}) {
	return (
		<>
			<label className="block mb-1" htmlFor="name">
				{nameOfLabel}
			</label>
			<input
				id={id}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
				placeholder={placeholder}
			/>
		</>
	);
}

export default AuthInputs;
