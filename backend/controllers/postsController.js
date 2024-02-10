import Post from "../models/PostModel.js";
import mongoose from "mongoose";
import User from "../models/UserModel.js";

export const getPosts = async (req, res) => {
	try {
		const posts = await Post.find().sort({ createdAt: "desc" });

		res.status(200).json({ success: "ALL POSTS", posts });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// *** get USER post
export const getUserPosts = async (req, res) => {
	// grab the authenticated user from req body
	const user = await User.findById(req.user._id);

	try {
		const userPosts = await Post.find({ user: user._id }).sort({ createdAt: "desc" });

		res.status(200).json({ userPosts });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

export const addPost = async (req, res) => {
	const { title, body } = req.body;

	// check the fields are not empty
	if (!title || !body) {
		return res.status(400).json({ error: "All fileds are required" });
	}

	// grab the authenticated user from req body
	const user = await User.findById(req.user._id);

	try {
		const post = await Post.create({ user: user._id, title, body });

		res.status(201).json({ success: "POST CREATED", post });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const deletePost = async (req, res) => {
	// check the ID is valid type
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({ error: "Invalid ID" });
	}

	// check if the post exists
	const post = await Post.findById(req.params.id);
	if (!post) {
		return res.status(400).json({ error: "Post not found" });
	}

	// check the user owns teh post
	const user = await User.findById(req.user._id);

	if (!post.user.equals(user._id)) {
		return res.status(401).json({ error: "Not Authorized" });
	}

	try {
		await post.deleteOne();

		res.status(200).json({ success: "POST DELETED", post });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const updatePost = async (req, res) => {
	const { title, body } = req.body;

	// check the fields are not empty
	if (!title || !body) {
		return res.status(400).json({ error: "All fileds are required" });
	}

	// check the ID if valid type
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({ error: "Invalid ID" });
	}

	// check if the post exists
	const post = await Post.findById(req.params.id);
	if (!post) {
		return res.status(400).json({ error: "Post not found" });
	}

	// check the user owns teh post
	const user = await User.findById(req.user._id);
	if (!post.user.equals(user._id)) {
		return res.status(401).json({ error: "Not Authorized" });
	}

	try {
		await post.updateOne({ title, body });

		res.status(200).json({ success: "POST UPDATED" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
