import { Router } from "express";
import { getRandomWord } from "../utils/randomWord.js";

const router = Router();

router.get("/", (req, res) => {
	const word = getRandomWord();
	res.json({ word });
});

export default router;
