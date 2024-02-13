import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import { useNavigate } from "react-router-dom";

const Layout = () => {
	const { user, setUser } = useContext(UserContext);

	// navigate
	const navigate = useNavigate();

	const handleLogout = () => {
		if (confirm("Are you sure you want to logout?")) {
			setUser({ email: null, posts: [] });

			// logout 1
			// localStorage.clear();

			// logout 2
			localStorage.removeItem("email");
			localStorage.removeItem("token");

			navigate("/");
		}
	};

	return (
		<>
			<header className="bg-indigo-500 text-white md:px-64">
				<nav className="flex items-center justify-between p-4">
					<Link
						to="/"
						className="nav-link">
						Home
					</Link>

					{user.email ? (
						<div className="flex items-center gap-4">
							<Link
								to="/create"
								className="nav-link">
								Add
							</Link>

							<Link
								to="/dashboard"
								className="nav-link">
								Dashboard
							</Link>

							<button
								onClick={handleLogout}
								className="nav-link">
								Logout
							</button>
						</div>
					) : (
						<div className="flex items-center gap-4">
							<Link
								to="/login"
								className="nav-link">
								Login
							</Link>

							<Link
								to="/register"
								className="nav-link">
								Register
							</Link>
						</div>
					)}
				</nav>
			</header>

			<main className="p-4">
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
