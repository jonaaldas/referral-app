import { useState } from "react";
import { Formik, ErrorMessage, Form } from "formik";
import AuthInput from "./AuthInputs";
import { useReferralContext } from "../context/ReferalContext";
import { useLocation } from "react-router-dom";

function UpdateForgotPasswordForm() {
	const location = useLocation();
	const urlPath = `/${location.pathname.split("/")[1]}/`;
	const token = location.pathname.split("/")[2];
	console.log(token);
	const { forgotPassword, updatePassowrd } = useReferralContext();
	const [values] = useState(
		urlPath === "/update-password/"
			? {
					password: "",
			  }
			: {
					email: "",
			  }
	);

	return (
		<Formik
			initialValues={values}
			onSubmit={(values) => {
				const { email, password } = values;
				if (urlPath === "/update-password/") {
					updatePassowrd(password, token);
				} else {
					forgotPassword(email);
				}
			}}
		>
			{({ handleSubmit, handleChange }) => (
				<div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
					<div className="w-full sm:max-w-md p-5 mx-auto">
						<h2 className="mb-12 text-center text-5xl font-extrabold">
							Reset Password
						</h2>
						<Form onSubmit={handleSubmit}>
							<div>
								<AuthInput
									nameOfLabel={
										urlPath === "/update-password/" ? "Password" : "Email"
									}
									id={urlPath === "/update-password/" ? "password" : "email"}
									type={urlPath === "/update-password/" ? "password" : "email"}
									name={urlPath === "/update-password/" ? "password" : "email"}
									onChange={handleChange}
									placeholder={
										urlPath === "/update-password/"
											? "Please eneter new password"
											: "Please enter email"
									}
								/>
								<ErrorMessage
									component="p"
									name="name"
									className="text-muted form-text"
								/>
								<button
									type="submit"
									className="w-full inline-flex items-center justify-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-yellow-700 active:bg-yellow-700 focus:outline-none focus:border-yellow-700 focus:ring focus:ring-yellow-200 disabled:opacity-25 transition"
								>
									{urlPath === "/update-password/"
										? "Reset Password"
										: "Send Email"}
								</button>
							</div>
						</Form>
					</div>
				</div>
			)}
		</Formik>
	);
}

export default UpdateForgotPasswordForm;
