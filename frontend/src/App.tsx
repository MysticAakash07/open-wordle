import { useWordle } from "./hooks/useWordle";
import GameBoard from "./components/GameBoard";
import Controls from "./components/Controls";

function App() {
	const {
		word,
		guesses,
		colors,
		currentRow,
		currentGuess,
		win,
		animatedRows,
		showAnswer,
		setShowAnswer,
		hintLetter,
		setHintLetter,
		handleReplay,
	} = useWordle();

	return (
		<main className="flex flex-col items-center justify-center h-full w-full p-5">
			<Controls
				word={word}
				showAnswer={showAnswer}
				setShowAnswer={setShowAnswer}
				hintLetter={hintLetter}
				setHintLetter={setHintLetter}
				handleReplay={handleReplay}
			/>

			<h1 className="text-4xl py-10 font-semibold">Welcome to free-wordle</h1>

			<GameBoard
				guesses={guesses}
				colors={colors}
				currentRow={currentRow}
				currentGuess={currentGuess}
				animatedRows={animatedRows}
			/>

			{win && (
				<div className="won text-2xl p-2 m-3 bg-green-500 rounded-lg text-white">
					Congrats, You Guessed it correctly!!
				</div>
			)}
		</main>
	);
}

export default App;
