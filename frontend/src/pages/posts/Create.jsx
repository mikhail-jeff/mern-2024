import { useContext, useState } from "react";
import { createPost } from "../../controllers/postsController";
import Alert from "../../components/Alert";

import { useNavigate } from "react-router-dom";
import { PostContext } from "../../contexts/PostContext";

const Create = () => {
	const { posts, setPosts } = useContext(PostContext);

	// use navigate
	const navigate = useNavigate();

	// error state
	const [error, setError] = useState(null);

	// form data state
	const [title, settitle] = useState("");
	const [body, setBody] = useState("");

	// handle create
	const handleCreate = async (e) => {
		e.preventDefault();

		try {
			// create new post
			const data = await createPost(title, body);

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
			<h1 className="title">Create a new post</h1>

			<form onSubmit={handleCreate}>
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

				<button className="btn">Create</button>
			</form>

			{error && <Alert message={error} />}
		</section>
	);
};

export default Create;
