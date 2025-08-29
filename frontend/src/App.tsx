import { useWordle } from "./hooks/useWordle";
import GameBoard from "./components/GameBoard";
import Controls from "./components/Controls";
import KeyBoard from "./components/KeyBoard";

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
		loading,
		setShowAnswer,
		hintLetter,
		setHintLetter,
		handleReplay,
		handleKey,
	} = useWordle();

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-lg">Warming up the server... please wait ⏳</p>
			</div>
		);
	}

	return (
		<main className="flex flex-col items-center justify-start min-h-screen w-full px-3 py-4 sm:p-5 sm:py-6">
			<Controls
				word={word}
				showAnswer={showAnswer}
				setShowAnswer={setShowAnswer}
				hintLetter={hintLetter}
				setHintLetter={setHintLetter}
				handleReplay={handleReplay}
			/>

			<h1 className="text-2xl sm:text-4xl py-6 sm:py-10 font-semibold text-center">
				Welcome to open-wordle
			</h1>

			<GameBoard
				guesses={guesses}
				colors={colors}
				currentRow={currentRow}
				currentGuess={currentGuess}
				animatedRows={animatedRows}
			/>

			{win && (
				<div className="won text-lg sm:text-2xl p-1 sm:p-3 m-3 sm:m-4 bg-green-500 rounded-lg text-white text-center">
					Congrats, You Guessed it correctly!!
				</div>
			)}

			{/* Show answer if user toggles it */}
			{/* {showAnswer && word && (
				<div className="answer mt-4 text-lg sm:text-xl text-gray-700">
					The word was: <span className="font-bold">{word}</span>
				</div>
			)} */}

			<KeyBoard onKeyClick={handleKey} />
		</main>
	);
}

export default App;
