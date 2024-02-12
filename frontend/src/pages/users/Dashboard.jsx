/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { deletePost, getUserPosts } from "../../controllers/postsController";
import { UserContext } from "../../contexts/UserContext";
import Post from "../../components/Post";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import Success from "../../components/Success";

const Dashboard = () => {
	// use user context
	const { user, setUser } = useContext(UserContext);

	// loading state
	const [loading, setLoading] = useState(true);

	// error state
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	useEffect(() => {
		setTimeout(async () => {
			const { userPosts, email } = await getUserPosts();

			// update user state
			setUser({ email, posts: userPosts });

			// remove the loading
			setLoading(false);
		}, 1000);
	}, []);

	// handle delete post
	const handleDelete = async (_id) => {
		if (confirm("Are you sure you want to delete?")) {
			try {
				const data = await deletePost(_id);
				setSuccess(data.success);
			} catch (error) {
				setError(error.message);
			}
		}

		const newPosts = user.posts.filter((post) => post._id !== _id);

		setUser({ ...user, posts: newPosts });
	};

	return (
		<section className="card">
			<h1 className="title">
				User Dashboard <span className="font-medium text-sm text-indigo-400 align-middle">( {user.email} )</span>
			</h1>

			{loading && <i className="fa-solid fa-spinner animate-spin text-3xl text-center block text-indigo-600"></i>}

			{success && <Success message={success} />}
			{error && <Alert message={error} />}

			{user.posts &&
				user.posts.map((post) => (
					<div key={post._id}>
						<Post post={post}>
							<div className="flex items-center gap-2 mt-2">
								<Link
									state={post}
									to="/update"
									title="Update"
									className="fa-solid fa-pen-to-square text-black"></Link>

								<button
									onClick={() => handleDelete(post._id)}
									title="Delete"
									className="fa-solid fa-trash-can"></button>
							</div>
						</Post>
					</div>
				))}
		</section>
	);
};

export default Dashboard;
