import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import AuthInput from "./AuthInputs";
import { useReferralContext } from "../context/ReferalContext";
import { useNavigate } from "react-router-dom";

function Auth() {
	const { isSignUp } = useReferralContext();

	const navigate = useNavigate();

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

	const schema = Yup.object().shape({
		// name: Yup.string().required(),
		// email: Yup.string()
		// 	.required("Email is a required field")
		// 	.email("Invalid email format"),
		// password: Yup.string()
		// 	.required("Password is a required field")
		// 	.min(8, "Password must be at least 8 characters"),
	});

	return (
		<Formik
			validationSchema={schema}
			initialValues={values}
			onSubmit={(values) => {
				const { name, email, password } = values;
				console.log(email, password);
				if (isSignUp) {
					userLogIn(email, password);
				} else {
					userRegister(name, email, password);
				}
			}}
		>
			{({ handleSubmit, handleChange }) => (
				<div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
					<div className="w-full sm:max-w-md p-5 mx-auto">
						<h2 className="mb-12 text-center text-5xl font-extrabold">
							{isSignUp === false ? "Sing Up" : "Log In"}
						</h2>
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								{isSignUp === false && (
									<div>
										<AuthInput
											nameOfLabel="Name"
											id="name"
											type="text"
											name="name"
											onChange={handleChange}
										/>
									</div>
								)}
							</div>
							<div className="mb-4">
								<AuthInput
									nameOfLabel="Email"
									id="email"
									type="text"
									name="email"
									onChange={handleChange}
								/>
							</div>
							<div className="mb-4">
								<AuthInput
									nameOfLabel="Password"
									id="password"
									type="password"
									name="password"
									onChange={handleChange}
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
										? "Already have an account! Sing in "
										: "Do not have an account? Register"}
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
