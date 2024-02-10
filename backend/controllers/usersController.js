import User from "../models/UserModel.js";
import bcrpyt from "bcryptjs";
import jwt from "jsonwebtoken";

// *** create token
const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "7d" });
};

// *** register user
export const register = async (req, res) => {
	// Grab data from req body
	const { email, password } = req.body;

	// Check the fields are not empty
	if (!email || !password) {
		return res.status(400).json({ error: "All fields are required" });
	}

	// Check if email already exist
	const userExist = await User.findOne({ email });
	if (userExist) {
		return res.status(400).json({ error: "Email is already registered" });
	}

	// Hash the password
	const salt = await bcrpyt.genSalt();
	const hashedPassword = await bcrpyt.hash(password, salt);

	try {
		// create user
		const user = await User.create({ email, password: hashedPassword });

		// create jsonwebtoken
		const token = createToken(user._id);

		// send response
		res.status(201).json({ email, token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// *** login user
export const login = async (req, res) => {
	// Grab data from req body
	const { email, password } = req.body;

	// Check the fields are not empty
	if (!email || !password) {
		return res.status(400).json({ error: "All fields are required" });
	}

	// Check if email already exist
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(400).json({ error: "Invalid email" });
	}

	// Check if password match
	const matchedPassword = await bcrpyt.compare(password, user.password);
	if (!matchedPassword) {
		return res.status(400).json({ error: "Invalid password" });
	}

	try {
		// create jsonwebtoken
		const token = createToken(user._id);

		// send response
		res.status(200).json({ email, token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
