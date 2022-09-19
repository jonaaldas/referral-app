import { Formik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { TiChevronLeft } from "react-icons/ti";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useReferralContext } from "../context/ReferalContext";

function NotesButton() {
	const { referrals, addNote, deleteNote, dateTime } = useReferralContext();
	const params = useParams();
	const navigate = useNavigate();
	const [values] = useState({
		dateAdded: dateTime(),
		note: "",
	});
	const eachClientsNotes = referrals
		.filter((foo) => {
			return foo._id === params.id;
		})
		.map((data) => {
			return (
				<div key={data._id}>
					{data.agentNotes.map((notes) => {
						return (
							<div key={notes.note} className="border flex justify-between">
								<div className="ml-2">
									<p className="text-xs">{notes.dateAdded}</p>
									<p>{notes.note}</p>
								</div>
								<div>
									<button
										onClick={() => {
											deleteNote(notes._id, params);
											toast("Note has been deleted");
										}}
										className="inline-block border border-black-600 hover:bg-blue-600 hover:text-white active:bg-blue-500 focus:outline-none focus:ring className='inline-block mr-2 px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-lg"
									>
										Delete Note
									</button>
								</div>
							</div>
						);
					})}
				</div>
			);
		});
	const referralClientCheck = referrals.find((foo) => foo._id === params.id);
	return (
		<div>
			<button onClick={() => navigate("/client-information/" + params.id)}>
				<TiChevronLeft className="text-5xl text-blue-500 mt-2 ml-2 mb-3" />
			</button>
			{referralClientCheck?.referralType === "recieved" ? (
				<Formik
					initialValues={values}
					onSubmit={(values, { resetForm }) => {
						if (values.note === "") {
							toast("Pleaase fill in the text");
						} else {
							addNote(values, params);
							toast("Note has been added");
							resetForm();
						}
					}}
				>
					{({ values, handleChange, handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<textarea
								className="border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
								cols="30"
								rows="10 "
								value={values.note}
								name="note"
								onChange={handleChange}
								placeholder="Enter any aditional notes"
							></textarea>
							<button
								type="submit"
								className="inline-block  border border-black-600 hover:bg-blue-600 hover:text-white active:bg-blue-500 focus:outline-none focus:ring className='inline-block px-5 py-3  text-sm font-medium text-white bg-blue-500 rounded-lg"
							>
								Add Note
							</button>
						</form>
					)}
				</Formik>
			) : (
				<h2> View notes</h2>
			)}
			{eachClientsNotes}
		</div>
	);
}

export default NotesButton;
