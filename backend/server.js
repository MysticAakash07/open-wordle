import express from "express";
import cors from "cors";
import wordRoutes from "./routes/word.js";

const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors());

app.use("/word", wordRoutes);

app.all("/", (req, res) => {
	res.send("Hola to All");
});

app.listen(PORT, () => {
	console.log(`Listening on Port ${PORT}`);
});
