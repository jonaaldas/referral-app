import { useNavigate, Link, useParams } from "react-router-dom";
import { TiChevronLeft, TiPhone, TiMail, TiMediaRecord } from "react-icons/ti";
import { useReferralContext } from "../context/ReferalContext";
function ClientDashboard() {
	const { referrals } = useReferralContext();
	const navigate = useNavigate();
	const params = useParams();
	const eachClient = referrals
		.filter((foo) => foo._id === params.id)
		.map((data) => {
			return (
				<div key={data._id}>
					<div className="flex place-content-between">
						<Link to="/">
							<TiChevronLeft className="text-5xl text-blue-500 mt-2 ml-2 mb-3" />
						</Link>
						<div>
							<button
								onClick={() => navigate(`/update-client-notes/${data._id}`)}
								className="inline-block  border border-black-600 hover:bg-green-600 hover:text-white active:bg-green-500 focus:outline-none focus:ring className='inline-block px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg mt-2 mr-2 mb-3"
							>
								Update Notes
							</button>
							<button
								onClick={() => navigate(`/edit-informatio/${data._id}`)}
								className="inline-block  border border-black-600 hover:bg-green-600 hover:text-white active:bg-green-500 focus:outline-none focus:ring className='inline-block px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg mt-2 mr-2 mb-3"
							>
								Edit Informatio
							</button>
						</div>
					</div>
					<div key={data._id} className="mx-6 mb-4 space-y-4">
						<h1 className="text-2xl">{data.clientsName}</h1>
						<div className="flex items-center ">
							<p className="text-sm text-center">{data.typeOfTransaction}</p>
							<TiMediaRecord className="ml-1" />
							<p className="text-sm text-center">
								Referred {data.referredDate}
							</p>
							<TiMediaRecord />
							<p className="text-sm text-center">
								Sent to: {data.realtorsName}
							</p>
						</div>
						<div className="flex items-center">
							<TiPhone className="text-xl" />
							<h2 className="text-lg pl-3">{data.clientsPhoneNumber}</h2>
						</div>
						<div className="flex items-center ">
							<TiMail className="text-xl" />
							<h2 className="text-lg pl-3">{data.clientsEmail}</h2>
						</div>
						<h1 className="text-2xl">Client Details</h1>
						{Object.entries(data.ClientDetails).map(([key, val]) => {
							let aSpace = " ";
							let newWord = key.split(/(?=[A-Z])/).join(aSpace);
							return (
								<div key={val}>
									<p className="text-xs">{newWord}</p>
									<p className="text-base mb-2">
										{val === "" ? "Unknown" : val}
									</p>
									<hr />
								</div>
							);
						})}
						<h1 className="text-2xl">Fianancing Details</h1>
						{Object.entries(data["FinancingDetails"]).map(([key, val]) => {
							let aSpace = " ";
							let newWord = key.split(/(?=[A-Z])/).join(aSpace);
							return (
								<div key={val}>
									<p className="text-xs">{newWord}</p>
									<p className="text-base mb-2">
										{val === "" ? "Unknown" : val}
									</p>
									<hr />
								</div>
							);
						})}
					</div>
				</div>
			);
		});
	// send
	return <section>{eachClient}</section>;
}

export default ClientDashboard;
