import { useState } from "react";
import { TiChevronLeft } from "react-icons/ti";
import { useParams, useNavigate } from "react-router-dom";
import { useReferralContext } from "../context/ReferalContext";

function NotesButton() {
	const date = new Date();
	const timeAndDate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

	const { referrals, addNote, deleteNote } = useReferralContext();
	const params = useParams();
	const navigate = useNavigate();
	const [notes, setNotes] = useState({
		dateAdded: timeAndDate,
		note: "",
	});

	const handleChange = (e) => {
		setNotes((prevNote) => ({ ...prevNote, note: e.target.value }));
	};

	const eachClientsNotes = referrals
		.filter((foo) => foo.id === params.id)
		.map((data) => {
			return (
				<div key={data.id}>
					{data.notes.map((notes) => {
						return (
							<div key={notes.id} className="border flex justify-between">
								<div className="ml-2">
									<p className="text-xs">{notes.dateAdded}</p>
									<p>{notes.note}</p>
								</div>
								<div>
									<button
										onClick={() => deleteNote(notes.id, params)}
										className="inline-block border border-black-600 hover:bg-green-600 hover:text-white active:bg-green-500 focus:outline-none focus:ring className='inline-block mr-2 px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-lg"
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
	return (
		<div>
			<button onClick={() => navigate("/client-information/" + params.id)}>
				<TiChevronLeft className="text-5xl text-blue-500 mt-2 ml-2 mb-3" />
			</button>

			<h1>Add Note</h1>
			<textarea
				className="border my-3 w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
				cols="30"
				rows="10 "
				value={notes.note}
				name="notes"
				onChange={handleChange}
				placeholder="Enter any aditional notes"
			></textarea>
			<button
				onClick={() => addNote(notes, params)}
				className="inline-block  border border-black-600 hover:bg-green-600 hover:text-white active:bg-green-500 focus:outline-none focus:ring className='inline-block px-5 py-3  text-sm font-medium text-white bg-blue-500 rounded-lg"
			>
				Add Note
			</button>
			{eachClientsNotes}
		</div>
	);
}

export default NotesButton;
