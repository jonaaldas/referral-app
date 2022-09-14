import { Formik, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import AuthInputs from "./AuthInputs";
import { useReferralContext } from "../context/ReferalContext";

function Auth() {
	const { isSignUp, registerUser, logIn, setIsSingedUp } = useReferralContext();

	const [values] = useState(
		isSignUp
			? {
					email: "",
					password: "",
			  }
			: {
					name: "",
					email: "",
					password: "",
			  }
	);

	const schema = Yup.object()
		.shape
		// isSignUp
		// 	? {
		// 			email: Yup.string()
		// 				.required("Email is a required field")
		// 				.email("Invalid email format"),
		// 			password: Yup.string()
		// 				.required("Password is a required field")
		// 				.min(8, "Password must be at least 8 characters"),
		// 	  }
		// 	: {
		// 			name: Yup.string().required(),
		// 			email: Yup.string()
		// 				.required("Email is a required field")
		// 				.email("Invalid email format"),
		// 			password: Yup.string()
		// 				.required("Password is a required field")
		// 				.min(8, "Password must be at least 8 characters"),
		// 	  }
		();

	return (
		<Formik
			validationSchema={schema}
			initialValues={values}
			onSubmit={(values) => {
				const { name, email, password } = values;
				if (isSignUp) {
					logIn(email, password);
				} else {
					registerUser(name, email, password);
				}
			}}
		>
			{({ handleSubmit, handleChange }) => (
				<div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
					<div className="w-full sm:max-w-md p-5 mx-auto">
						<h2 className="mb-12 text-center text-5xl font-extrabold">
							{isSignUp === false ? "Register" : "Log In"}
						</h2>
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								{isSignUp === false && (
									<div>
										<AuthInputs
											nameOfLabel="Name"
											id="name"
											type="text"
											name="name"
											onChange={handleChange}
										/>
										<ErrorMessage
											component="p"
											name="name"
											className="text-muted form-text"
										/>
									</div>
								)}
							</div>
							<div className="mb-4">
								<AuthInputs
									nameOfLabel="Email"
									id="email"
									type="text"
									name="email"
									onChange={handleChange}
								/>
								<ErrorMessage
									component="p"
									name="email"
									className="text-muted form-text"
								/>
							</div>
							<div className="mb-4">
								<AuthInputs
									nameOfLabel="Password"
									id="password"
									type="password"
									name="password"
									onChange={handleChange}
								/>
								<ErrorMessage
									component="p"
									name="password"
									className="text-muted form-text"
								/>
							</div>
							<div className="mt-6">
								<button
									type="submit"
									className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
								>
									{isSignUp ? "Log In" : "Register"}
								</button>
							</div>
							<div className="mt-6">
								<button
									type="button"
									onClick={() =>
										setIsSingedUp((prevIsSingedUp) => !prevIsSingedUp)
									}
									className="w-full inline-flex items-center justify-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-yellow-700 active:bg-yellow-700 focus:outline-none focus:border-yellow-700 focus:ring focus:ring-yellow-200 disabled:opacity-25 transition"
								>
									{isSignUp
										? "Do not have an account? Register"
										: "Already have an account! Log in "}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</Formik>
	);
}

export default Auth;
