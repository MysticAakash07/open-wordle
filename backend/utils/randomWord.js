import words from "../data/words.js";

export const getRandomWord = () => {
	return words[Math.floor(Math.random() * words.length)];
};
