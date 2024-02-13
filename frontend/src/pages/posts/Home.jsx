import { useContext, useEffect, useState } from "react";
import { getPosts } from "../../controllers/postsController";
import { PostContext } from "../../contexts/PostContext";
import Post from "../../components/Post";

const Home = () => {
	const { posts, setPosts } = useContext(PostContext);

	// loading state
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(async () => {
			// get all posts
			const data = await getPosts();

			// update posts state
			setPosts(data.posts);

			// remove the loading
			setLoading(false);
		}, 1000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<section className="card">
			<h1 className="title">Latest posts</h1>

			{loading && <i className="fa-solid fa-spinner animate-spin text-3xl text-center block text-indigo-600"></i>}

			{posts && posts.length > 0 ? posts.map((post) => <div key={post?._id}>{post && <Post post={post} />}</div>) : <div>No posts available</div>}
		</section>
	);
};

export default Home;
