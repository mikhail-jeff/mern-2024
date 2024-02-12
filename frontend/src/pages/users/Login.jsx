import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../controllers/usersControllers";
import Alert from "../../components/Alert";

const Login = () => {
	// use navigate hook
	const navigate = useNavigate();

	// user user context
	const { setUser } = useContext(UserContext);

	// error state
	const [error, setError] = useState(null);

	// formdata state
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// handle login
	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			// login user
			await loginUser(email, password);

			// update the user state
			setUser({ email, posts: [] });

			// navigate to dashboard
			navigate("/dashboard");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<section className="card">
			<h1 className="title">Login to your account</h1>

			<form onSubmit={handleLogin}>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email Address"
					className="input"
					autoFocus
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					className="input"
				/>
				<button className="btn">Login</button>
			</form>

			{error && <Alert message={error} />}
		</section>
	);
};

export default Login;
