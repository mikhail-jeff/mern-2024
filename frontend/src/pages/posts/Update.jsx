import { useContext, useState } from "react";
import { updatePost } from "../../controllers/postsController";
import Alert from "../../components/Alert";

import { useNavigate, useLocation } from "react-router-dom";
import { PostContext } from "../../contexts/PostContext";

const Update = () => {
	const { posts, setPosts } = useContext(PostContext);

	// use navigate
	const navigate = useNavigate();

	// use location
	const { state } = useLocation();

	// error state
	const [error, setError] = useState(null);

	// form data state
	const [title, settitle] = useState(state.title);
	const [body, setBody] = useState(state.body);

	// handle create
	const handleUpdate = async (e) => {
		e.preventDefault();

		try {
			// create new post
			const data = await updatePost(state._id, title, body);

			// update the posts state
			setPosts([...posts, data.post]);

			// navigate to dashboard
			navigate("/dashboard");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<section className="card">
			<h1 className="title">Update your post</h1>

			<form onSubmit={handleUpdate}>
				<input
					type="text"
					placeholder="Post Title"
					className="input"
					autoFocus
					value={title}
					onChange={(e) => settitle(e.target.value)}
				/>

				<textarea
					rows={6}
					placeholder="Post Content"
					className="input"
					value={body}
					onChange={(e) => setBody(e.target.value)}></textarea>

				<button className="btn">Update</button>
			</form>

			{error && <Alert message={error} />}
		</section>
	);
};

export default Update;
