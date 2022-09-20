import React from "react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useReferralContext } from "../context/ReferalContext";
import FinancingQuestions from "./FinancingQuestions";
import ClientDetailsQuestions from "./ClientDetailsQuestions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TiChevronLeft } from "react-icons/ti";
import { useEffect } from "react";

function InputForm() {
	const [lenderQuestionBoolean, setLenderQuestionsBoolean] = useState(false);
	const [clientDetailsBoolean, setClientDetailsBoolean] = useState(false);
	const { sendRefferal, editReferralInformation, getSingleReferralToEdit } =
		useReferralContext();

	const navigate = useNavigate();
	const params = useParams();

	const date = new Date();
	const timeAndDate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

	const [inputValues, setInputValues] = useState({
		referralType: "",
		clientsName: "",
		typeOfTransaction: "",
		clientsPhoneNumber: "",
		clientsEmail: "",
		closed: false,
		referredDate: timeAndDate,
		realtorsName: "Talya Foale",
		realtorsEmail: "amatissoffg@epa.gov",
		realtorsPhone: "123123123",
		PropertyType: "",
		BedsandBaths: "",
		Financing: "",
		LendersName: "",
		LendersPhoneNumber: "",
		LendersEmail: "",
		note: "",
	});

	useEffect(() => {
		(async () => {
			if (params.id) {
				let values = await getSingleReferralToEdit(params.id);
				setInputValues(values.data);
			}
		})();
	}, [params.id, getSingleReferralToEdit]);
	return (
		<>
			<Link to='/'>
				<TiChevronLeft className='text-5xl text-blue-500 mt-2 ml-2 mb-3' />
			</Link>
			<section className='flex flex-col items-center justify-center'>
				<h2 className='text-2xl font-bold sm:text-3xl'>Send a new Referral</h2>
				<Formik
					initialValues={inputValues}
					onSubmit={(values, { resetForm }) => {
						if (params.id) {
							editReferralInformation(values, params.id);
						} else {
							sendRefferal(values);
						}
						navigate("/");
						resetForm();
					}}
					enableReinitialize
					validationSchema={Yup.object({
						clientsName: Yup.string().required("Please add First Name"),
						typeOfTransaction: Yup.string()
							.required("Please Specify the type of transaction")
							.oneOf([
								"seller",
								"buyer",
								"renter",
								"Seller",
								"Buyer",
								"Renter",
							]),
						clientsPhoneNumber: Yup.string().required(
							"Phone number is required"
						),
						clientsEmail: Yup.string().email().required("Email is Requierd"),
					})}
				>
					{({ values, handleChange, handleSubmit }) => (
						<form
							onSubmit={handleSubmit}
							className='flex content-center flex-col items-center w-6/12'
						>
							{!params.id ? (
								<select
									name='referralType'
									className='border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm'
									value={values.referralType}
									onChange={handleChange}
								>
									<option>Are you sending or recieving a referral</option>
									<option value='sent'>Send A Referral</option>
									<option value='recieved'>Recieve A Referral</option>
								</select>
							) : null}
							<input
								className='border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm'
								type='text'
								name='clientsName'
								value={values.clientsName}
								onChange={handleChange}
								placeholder='Enter Clients Name'
							/>
							{!params.id ? (
								<select
									name='typeOfTransaction'
									className='border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm'
									value={values.typeOfTransaction}
									onChange={handleChange}
								>
									<option>Choose type of Transaction</option>
									<option value='buyer'>Buyer</option>
									<option value='seller'>Seller</option>
									<option value='renter'>Renter</option>
								</select>
							) : null}
							<input
								className='border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm'
								type='number'
								name='clientsPhoneNumber'
								value={values.clientsPhoneNumber}
								onChange={handleChange}
								placeholder='Enter Clients Phone Number'
							/>
							<input
								className='border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm'
								type='email'
								name='clientsEmail'
								value={values.clientsEmail}
								onChange={handleChange}
								placeholder='Enter Clients Email'
							/>
							{/* Financing questions */}
							<div className='flex flex-col items-center w-full'>
								<h3>Do they have a lender?</h3>
								<div>
									<input
										type='radio'
										id='true'
										name='lenderYes'
										value={true}
										onClick={() => setLenderQuestionsBoolean(true)}
									/>
									<label>Yes</label>
									<input
										type='radio'
										id='false'
										name='lenderNo'
										value={false}
										onClick={() => setLenderQuestionsBoolean(false)}
									/>
									<label>No</label>
								</div>
							</div>
							{lenderQuestionBoolean === true ||
							(params.id &&
								values.LendersName !== "" &&
								values.LendersEmail !== "" &&
								values.LendersPhoneNumber !== "" &&
								values.Financing !== "") ? (
								<FinancingQuestions
									value={{ values }}
									handleChange={{ handleChange }}
								/>
							) : null}
							{/* Client details questions */}
							<div className='flex flex-col items-center w-full'>
								<h3>Do you know the house they want?</h3>
								<div>
									<input
										type='radio'
										id='true'
										name='clientYes'
										value={true}
										onClick={() => setClientDetailsBoolean(true)}
									/>
									<label>Yes</label>
									<input
										type='radio'
										id='false'
										name='clientNo'
										value={false}
										onClick={() => setClientDetailsBoolean(false)}
									/>
									<label>No</label>
								</div>
							</div>
							{clientDetailsBoolean === true ||
							(params.id && values.PropertyType !== "") ||
							values.BedsandBaths !== "" ? (
								<ClientDetailsQuestions
									value={{ values }}
									handleChange={{ handleChange }}
								/>
							) : null}
							{!params.id ? (
								<textarea
									className='border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm'
									cols='30'
									rows='10 '
									value={
										values?.agentNotes ? values.agentNotes[0].note : values.note
									}
									name={values?.agentNotes ? "agentNotes[0].note" : "note"}
									onChange={handleChange}
									placeholder='Enter any aditional notes'
								></textarea>
							) : null}

							<button
								type='submit'
								className='inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg'
							>
								Submit
							</button>
						</form>
					)}
				</Formik>
			</section>
		</>
	);
}

export default InputForm;
