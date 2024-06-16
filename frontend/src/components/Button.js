function Button({ label, onClick }) {
	return (
		<button
			onClick={onClick}
			className="w-2/5 m-4 rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
		>
			{label}
		</button>
	);
}

export default Button;
