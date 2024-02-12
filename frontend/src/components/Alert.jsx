const Alert = ({ message }) => {
	return (
		<div className="bg-red-500 text-white p-2 rounded-md mt-6 text-sm mb-4">
			<i className="fa-solid fa-triangle-exclamation mr-1 mb-4"></i>
			{message}
		</div>
	);
};

export default Alert;
