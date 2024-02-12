// *** get all posts
export const getPosts = async () => {
	const res = await fetch("/api/posts");
	const data = await res.json();

	if (!res.ok) {
		throw Error(data.error);
	}

	return data;
};

// *** get user post
export const getUserPosts = async () => {
	const res = await fetch("/api/posts/user", {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});

	const data = await res.json();

	if (!res.ok) {
		throw Error(data.error);
	}

	return data;
};

// *** create post
export const createPost = async (title, body) => {
	if (!title || !body) {
		throw Error("All fields are required");
	}

	const res = await fetch("/api/posts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify({ title, body }),
	});

	const data = await res.json();

	if (!res.ok) {
		throw Error(data.error);
	}

	return data;
};

// *** delete post
export const deletePost = async (_id) => {
	const res = await fetch(`/api/posts/${_id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});

	const data = await res.json();

	if (!res.ok) {
		throw Error(data.error);
	}

	return data;
};

// *** update post
export const updatePost = async (_id, title, body) => {
	if (!title || !body) {
		throw Error("All fields are required");
	}

	const res = await fetch(`/api/posts/${_id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify({ title, body }),
	});

	const data = await res.json();

	if (!res.ok) {
		throw Error(data.error);
	}

	return data;
};
