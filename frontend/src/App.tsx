import { useEffect, useRef, useState } from "react";
import Line from "./Line";
const WORD_LENGTH = 5;

function App() {
	const [word, setWord] = useState("");
	const [guesses, setGuesses] = useState(Array(6).fill("")); // fixed 6 rows
	const [colors, setColors] = useState(
		Array(6).fill(Array(WORD_LENGTH).fill(""))
	); // <-- store color info
	const [currentRow, setCurrentRow] = useState(0);
	const [currentGuess, setCurrentGuess] = useState("");
	const [win, setWin] = useState(false);
	const [replay, setReplay] = useState(0);
	const [animateRow, setAnimateRow] = useState<number | null>(null);
	const [showAnswer, setShowAnswer] = useState(false);
	const [hintLetter, setHintLetter] = useState<string | null>(null);

	const letterMap = useRef<number[]>(Array(26).fill(0));

	const makeLetterMap = (ans: string) => {
		letterMap.current = Array(26).fill(0);
		for (let i = 0; i < WORD_LENGTH; i++) {
			const idx = ans[i].charCodeAt(0) - 65; // 'A' → 0, 'Z' → 25
			letterMap.current[idx]++;
		}
	};

	// Determine colors for guess
	const checkGuess = (curr: string) => {
		const res = Array(WORD_LENGTH).fill("gray");
		const used = Array(WORD_LENGTH).fill(false);

		// First pass: greens
		for (let i = 0; i < WORD_LENGTH; i++) {
			if (curr[i] === word[i]) {
				res[i] = "green";
				used[i] = true;
			}
		}

		// Second pass: blues
		for (let i = 0; i < WORD_LENGTH; i++) {
			if (res[i] === "green") continue; // skip already correct
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

	const handleReplay = () => {
		setWord("");
		setGuesses(Array(6).fill(""));
		setColors(Array(6).fill(Array(WORD_LENGTH).fill("")));
		setCurrentRow(0);
		setCurrentGuess("");
		setWin(false);
		setHintLetter(null);
		setReplay((r) => r + 1);
	};
	useEffect(() => {
		const getWord = async () => {
			const res = await fetch("http://localhost:3500/word");
			const data = await res.json();
			const ans = data.word.toUpperCase();
			setWord(ans);
			makeLetterMap(ans);
		};
		getWord();
	}, [replay]);

	useEffect(() => {
		const handleKeyDown = (e: globalThis.KeyboardEvent) => {
			if (win) return;

			const key = e.key.toUpperCase();

			if (/^[A-Z]$/.test(key)) {
				if (currentGuess.length < 5) {
					setCurrentGuess((prev) => prev + key);
				}
			}

			if (key === "BACKSPACE") {
				setCurrentGuess((prev) => prev.slice(0, -1));
			}

			if (key === "ENTER") {
				if (currentGuess.length === 5) {
					if (currentGuess.toUpperCase() === word) {
						setWin(true);
					}

					// calculate colors for this guess
					const rowColors = checkGuess(currentGuess);

					const newGuesses = [...guesses];
					newGuesses[currentRow] = currentGuess;

					const newColors = [...colors];
					newColors[currentRow] = rowColors;

					setGuesses(newGuesses);
					setColors(newColors);

					setAnimateRow(currentRow);

					setCurrentRow((prev) => prev + 1); // move down a row
					setCurrentGuess("");
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [guesses, colors, currentGuess, currentRow, win, word]);

	return (
		<main className="flex flex-col items-center justify-center h-full w-full p-5">
			{/* Answer */}
			<div className="absolute top-4 left-4 flex items-center gap-2">
				<button
					onClick={() => setShowAnswer((s) => !s)}
					className="px-2 py-1 bg-gray-700 text-white rounded-lg text-sm"
				>
					{showAnswer ? "Hide Answer" : "Show Answer"}
				</button>

				{showAnswer && (
					<span className="ml-2 font-mono text-lg text-red-500">{word}</span>
				)}
			</div>

			{/* Hint */}
			<div className="absolute top-4 right-4 flex items-center gap-2">
				<button
					onClick={() => {
						if (!hintLetter && word) {
							const availableIndexes = [...Array(WORD_LENGTH).keys()];
							const randomIndex =
								availableIndexes[Math.floor(Math.random() * WORD_LENGTH)];
							setHintLetter(word[randomIndex]);
						}
					}}
					className={`px-2 py-1 rounded-lg text-sm ${
						hintLetter
							? "bg-gray-400 cursor-not-allowed"
							: "bg-purple-500 text-white"
					}`}
					disabled={!!hintLetter} // disables after one hint
				>
					Hint
				</button>

				{hintLetter && (
					<span className="ml-2 font-mono text-lg text-blue-500">
						{hintLetter}
					</span>
				)}
			</div>

			<h1 className="text-4xl py-10 font-semibold">Welcome to free-wordle</h1>

			<div className="flex flex-col gap-2 ">
				{guesses.map((guess, i) => (
					<Line
						key={i}
						guess={i === currentRow ? currentGuess : guess}
						colors={colors[i]}
						animate={i === animateRow}
					/>
				))}
			</div>

			{win && (
				<div className="won text-2xl p-2 m-3 bg-green-500 rounded-lg text-white">
					Congrats, You Guessed it correctly!!
				</div>
			)}

			<div className="replay-button absolute bottom-0 right-0 m-4 p-2 bg-blue-500 rounded-lg">
				<button
					onClick={(e) => {
						e.currentTarget.blur(); // remove focus from button
						handleReplay();
					}}
				>
					New Word
				</button>
			</div>
		</main>
	);
}

export default App;
