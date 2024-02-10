import { connect } from "mongoose";
import chalk from "chalk";

export const connectDB = async () => {
	try {
		connect(process.env.MONGO_URI, { dbName: "mern-project" });
		console.log(chalk.magentaBright.underline.italic("Connected to MongoDB"));
	} catch (error) {
		console.log(chalk.redBright.underline.italic(error));
	}
};
