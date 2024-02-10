import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const auth = async (req, res, next) => {
	const { authorization } = req.headers;

	// check if the req headers contains auth key
	if (!authorization) {
		return res.status(401).json({ error: "Authorization token not found" });
	}

	// grab the token from the headers
	const token = authorization.split(" ")[1];

	try {
		// decode and extract the user if from token
		const { _id } = jwt.verify(token, process.env.SECRET);

		// save the user in request
		req.user = await User.findById(_id).select("_id");

		next();
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
};
