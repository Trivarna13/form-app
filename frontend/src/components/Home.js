import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Home() {
	const nav = useNavigate();
	const navigateToForm = (formType) => {
		nav(`/form/${formType}`);
	};
	return (
		<div className="flex min-h-screen justify-center items-center px-6 py-12 lg:px-8">
			<Button label="Form A" onClick={() => navigateToForm("A")}></Button>
			<Button label="Form B" onClick={() => navigateToForm("B")}></Button>
		</div>
	);
}

export default Home;
