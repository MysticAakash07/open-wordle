import { useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

interface Props {
	word: string;
	showAnswer: boolean;
	setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>;
	hintLetter: string | null;
	setHintLetter: React.Dispatch<React.SetStateAction<string | null>>;
	handleReplay: () => void;
}

const WORD_LENGTH = 5;

export default function Controls({
	word,
	showAnswer,
	setShowAnswer,
	hintLetter,
	setHintLetter,
	handleReplay,
}: Props) {
	const [showRules, setShowRules] = useState(false);

	return (
		<>
			<div className="m-2 p-2 flex items-center justify-center">
				{/* Answer */}
				<div className="absolute top-4 left-4 flex items-center gap-2 ml-2">
					<button
						onClick={(e) => {
							e.currentTarget.blur();
							setShowAnswer(!showAnswer);
						}}
						className="px-4 py-1.5 bg-cyan-500 text-white rounded-lg text-md"
					>
						{showAnswer ? "Hide Answer" : "Show Answer"}
					</button>
					{showAnswer && (
						<span className="ml-2 font-mono text-lg text-red-500  tracking-widest">
							{word}
						</span>
					)}
				</div>

				<div className="absolute top-4 right-5 flex items-center gap-4">
					{/* Hint */}
					<div>
						<button
							onClick={() => {
								if (!hintLetter && word) {
									const availableIndexes = [...Array(WORD_LENGTH).keys()];
									const randomIndex =
										availableIndexes[Math.floor(Math.random() * WORD_LENGTH)];
									setHintLetter(word[randomIndex]);
								}
							}}
							className={`px-4 py-1.5 rounded-lg text-md ${
								hintLetter
									? "bg-gray-400 cursor-not-allowed"
									: "bg-purple-500 text-white"
							}`}
							disabled={!!hintLetter}
						>
							Hint
						</button>
						{hintLetter && (
							<span className="ml-2 font-mono text-lg text-blue-500">
								{hintLetter}
							</span>
						)}
					</div>

					{/* Rules */}
					<div>
						<button
							onClick={() => setShowRules(true)}
							className="p-2 text-gray-700 hover:text-black"
						>
							<FiHelpCircle size={22} />
						</button>
					</div>

					{/* Rules Panel */}
					{showRules && (
						<div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 border-l border-gray-300 pt-5">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-lg font-semibold">How to Play</h2>
								<button
									onClick={() => setShowRules(false)}
									className="text-gray-600 hover:text-black mr-4"
								>
									✖
								</button>
							</div>
							<ul className="text-sm space-y-2">
								<li>You have 6 tries to guess a {WORD_LENGTH}-letter word</li>
								<li>You can use 1 hint (reveals a random letter)</li>
								<li>🟩 Green = correct letter, correct spot</li>
								<li>🟨 Yellow = correct letter, wrong spot</li>
								<li>⬜ Gray = not in the word</li>
							</ul>
						</div>
					)}
				</div>
			</div>

			{/* Replay */}
			<div className="replay-button absolute bottom-0 right-0 m-4 mr-7 px-4 py-1.5 bg-blue-500 rounded-lg text-white">
				<button
					onClick={(e) => {
						e.currentTarget.blur();
						handleReplay();
					}}
				>
					New Word
				</button>
			</div>
		</>
	);
}
