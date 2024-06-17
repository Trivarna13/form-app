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
		<div className="flex min-h-screen justify-center items-center px-6 py-12 lg:px-8">
			<Button label="Form A" onClick={() => navigateToForm("A")}></Button>
			<Button label="Form B" onClick={() => navigateToForm("B")}></Button>
			<Button label="Refresh Data" onClick={refreshData}></Button>
		</div>
	);
}

export default Home;
