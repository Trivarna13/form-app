import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CountrySelector from "./CountrySelector";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countryList from "react-select-country-list";

function Form() {
	let { formType } = useParams();
	// console.log({ formType });
	const [name, setName] = useState("");
	const [countryCode, setCountryCode] = useState(null);
	const [phoneNumber, setPhoneNumber] = useState("");

	useEffect(() => {
		const savedData = localStorage.getItem(`form-${formType}`);
		if (savedData) {
			const { name, countryCode, phoneNumber } = JSON.parse(savedData);
			console.log(savedData);
			setName(name);
			setCountryCode(
				countryList()
					.getData()
					.find((country) => country.value === countryCode)
			);
			setPhoneNumber(phoneNumber);
		}
	}, [formType]);

	const handleSelect = (country) => {
		// console.log(country);
		setCountryCode(country);
		setPhoneNumber("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// const formData = { formType, name, countryCode, phoneNumber };
		// console.log({ formData });
		if (!/^[A-Za-z]+$/.test(name)) {
			alert("Name must contain only alphabetic characters");
			return;
		}
		if (!/^[+\d]+$/.test(phoneNumber)) {
			alert("Phone Number must be numeric");
			return;
		}
		const formData = {
			formType,
			name,
			countryCode: countryCode.value,
			phoneNumber,
		};
		// console.log({ formData });
		try {
			await axios.post(
				"https://form-app-emgw.onrender.com/save",
				formData
			);
			localStorage.setItem(`form-${formType}`, JSON.stringify(formData));
			alert("Form submitted successfully");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="min-h-screen">
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Form {formType}
					</h2>
				</div>
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label className="block text-sm font-medium leading-6 text-gray-900">
								Name:
							</label>
							<div className="mt-2">
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 sm:text-sm sm:leading-6"
								></input>
							</div>
						</div>
						<div>
							<label className="block text-sm font-medium leading-6 text-gray-900">
								Country Code:
							</label>
							<div className="mt-2">
								<CountrySelector
									handleSelect={handleSelect}
									countryCode={
										countryCode ? countryCode.value : ""
									}
									onCountryChange={setCountryCode}
								/>
							</div>
						</div>
						<div>
							<label className="block text-sm font-medium leading-6 text-gray-900">
								Phone Number:
							</label>
							<div className="mt-2">
								<PhoneInput
									placeholder="Enter phone number"
									value={phoneNumber}
									onChange={setPhoneNumber}
									country={
										countryCode ? countryCode.code : ""
									}
									international
									className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-blue-500 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
						>
							Submit
						</button>
						<Link
							to="/"
							className="flex w-full justify-center rounded-md bg-gray-400 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-gray-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
						>
							Go Back
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Form;
