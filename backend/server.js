import express from "express";
import { config } from "dotenv";
import chalk from "chalk";
import morgan from "morgan";
import { postsRoutes } from "./routes/postsRoutes.js";
import { connectDB } from "./db/connect.js";
import { usersRoutes } from "./routes/usersRoutes.js";
config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

const startServer = async () => {
	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log(chalk.magentaBright.underline.italic(`Server running on http://localhost:${PORT}`));
		});
	} catch (error) {
		console.log(chalk.redBright.underline.italic(error));
	}
};

startServer();
