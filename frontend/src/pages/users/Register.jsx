import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "../../components/Alert";
import { registerUser } from "../../controllers/usersControllers";
import { UserContext } from "../../contexts/UserContext";

const Register = () => {
	// use navigate hook
	const navigate = useNavigate();

	// use user context
	const { setUser } = useContext(UserContext);

	// error state
	const [error, setError] = useState(null);

	// formdata state
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		passwordConfirm: "",
	});

	// handle register
	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			// register user
			await registerUser(formData.email, formData.password, formData.passwordConfirm);

			// update the user state
			setUser({ email: formData.email, posts: [] });

			// navigate to dashboard
			navigate("/dashboard");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<section className="card">
			<h1 className="title">Create a new account</h1>

			<form onSubmit={handleRegister}>
				<input
					type="email"
					value={formData.email}
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
					placeholder="Email Address"
					className="input"
					autoFocus
				/>
				<input
					type="password"
					value={formData.password}
					onChange={(e) => setFormData({ ...formData, password: e.target.value })}
					placeholder="Password"
					className="input"
				/>
				<input
					type="password"
					value={formData.passwordConfirm}
					onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
					placeholder="Confirm Password"
					className="input"
				/>
				<button className="btn">Register</button>
			</form>

			{error && <Alert message={error} />}
		</section>
	);
};

export default Register;
