import express from "express";
import chalk from "chalk";
import { config } from "dotenv";
import morgan from "morgan";
config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.json({ message: "Server running" });
});

app.listen(PORT, () => {
	console.log(chalk.cyanBright.underline(`Server running on http://localhost:${PORT}`));
});
