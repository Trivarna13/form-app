import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Home() {
	const nav = useNavigate();
	const navigateToForm = (formType) => {
		nav(`/form/${formType}`);
	};
	const refreshData = async () => {
		try {
			await axios.get("http://localhost:5000/sync");
			alert("Data synchronized with Online Excel Sheet (Google Sheets)");
		} catch (error) {
			console.log(error);
			alert("Failed to synchronize data");
		}
	};
	return (
		<div className="flex min-h-screen flex-col justify-center items-center">
			<div className="flex space-x-4">
				<Button label="Form A" onClick={() => navigateToForm("A")} />
				<Button label="Form B" onClick={() => navigateToForm("B")} />
			</div>
			<div className="mt-4">
				<Button label="Refresh Data" onClick={refreshData} />
			</div>
		</div>
	);
}

export default Home;
