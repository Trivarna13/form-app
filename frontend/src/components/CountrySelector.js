import { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

function CountrySelector({ countryCode, handleSelect, onCountryChange }) {
	const [value, setValue] = useState(countryCode);
	const options = useMemo(() => countryList().getData(), []);

	useEffect(() => {
		if (countryCode) {
			const selectedCountry = options.find(
				(option) => option.value === countryCode
			);
			setValue(selectedCountry);
		}
	}, [countryCode, options]);

	const changeHandler = (value) => {
		setValue(value);
		handleSelect(value.value);
		if (onCountryChange) {
			onCountryChange(value);
		}
	};

	return <Select options={options} value={value} onChange={changeHandler} />;
}

export default CountrySelector;
