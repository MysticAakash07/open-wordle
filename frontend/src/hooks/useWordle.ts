import { useEffect, useRef, useState } from "react";

const WORD_LENGTH = 5;
const API_URL = import.meta.env.VITE_API_URL;

export function useWordle() {
	const [word, setWord] = useState("");
	const [guesses, setGuesses] = useState(Array(6).fill(""));
	const [colors, setColors] = useState(
		Array(6).fill(Array(WORD_LENGTH).fill(""))
	);
	const [currentRow, setCurrentRow] = useState(0);
	const [currentGuess, setCurrentGuess] = useState("");
	const [win, setWin] = useState(false);
	const [replay, setReplay] = useState(0);
	const [loading, setLoading] = useState(true);

	// NEW: track animation for each row
	const [animatedRows, setAnimatedRows] = useState<boolean[]>(
		Array(6).fill(false)
	);

	const [showAnswer, setShowAnswer] = useState(false);
	const [hintLetter, setHintLetter] = useState<string | null>(null);

	const letterMap = useRef<number[]>(Array(26).fill(0));

	const makeLetterMap = (ans: string) => {
		letterMap.current = Array(26).fill(0);
		for (let i = 0; i < WORD_LENGTH; i++) {
			const idx = ans[i].charCodeAt(0) - 65;
			letterMap.current[idx]++;
		}
	};

	const checkGuess = (curr: string) => {
		const res = Array(WORD_LENGTH).fill("gray");
		const used = Array(WORD_LENGTH).fill(false);

		for (let i = 0; i < WORD_LENGTH; i++) {
			if (curr[i] === word[i]) {
				res[i] = "green";
				used[i] = true;
			}
		}

		for (let i = 0; i < WORD_LENGTH; i++) {
			if (res[i] === "green") continue;
			for (let j = 0; j < WORD_LENGTH; j++) {
				if (!used[j] && curr[i] === word[j]) {
					res[i] = "yellow";
					used[j] = true;
					break;
				}
			}
		}

		return res;
	};

	const handleKey = (key: string) => {
		if (win) return;
		key = key.toUpperCase();

		if (/^[A-Z]$/.test(key)) {
			if (currentGuess.length < WORD_LENGTH) {
				setCurrentGuess((prev) => prev + key);
			}
		}
		if (key === "BACKSPACE") {
			setCurrentGuess((prev) => prev.slice(0, -1));
		}
		if (key === "ENTER") {
			if (currentGuess.length === WORD_LENGTH) {
				if (currentGuess === word) setWin(true);

				const rowColors = checkGuess(currentGuess);

				const newGuesses = [...guesses];
				newGuesses[currentRow] = currentGuess;

				const newColors = [...colors];
				newColors[currentRow] = rowColors;

				setGuesses(newGuesses);
				setColors(newColors);

				setAnimatedRows((prev) => {
					const copy = [...prev];
					copy[currentRow] = true;
					return copy;
				});

				setCurrentRow((prev) => prev + 1);
				setCurrentGuess("");
			}
		}
	};

	const handleReplay = () => {
		setWord("");
		setGuesses(Array(6).fill(""));
		setColors(Array(6).fill(Array(WORD_LENGTH).fill("")));
		setCurrentRow(0);
		setCurrentGuess("");
		setWin(false);
		setHintLetter(null);
		setShowAnswer(false);
		setAnimatedRows(Array(6).fill(false));
		setReplay((r) => r + 1);
	};

	// Fetch new word
	useEffect(() => {
		const getWord = async () => {
			setLoading(true);
			try {
				const res = await fetch(`${API_URL}/word`);
				const data = await res.json();
				const ans = data.word.toUpperCase();
				setWord(ans);
				makeLetterMap(ans);
			} catch (err) {
				console.error("Failed to fetch word:", err);
			} finally {
				setLoading(false);
			}
		};
		getWord();
	}, [replay]);

	// Handle key presses
	useEffect(() => {
		const handleKeyDown = (e: globalThis.KeyboardEvent) => {
			handleKey(e.key);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [guesses, colors, currentGuess, currentRow, win, word]);

	return {
		word,
		guesses,
		colors,
		currentRow,
		currentGuess,
		win,
		animatedRows,
		showAnswer,
		loading,
		setShowAnswer,
		hintLetter,
		setHintLetter,
		handleReplay,
		handleKey,
	};
}
