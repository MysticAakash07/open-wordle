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
				<div className="absolute top-4 left-2 sm:left-4 flex items-center gap-2">
					<button
						onClick={(e) => {
							e.currentTarget.blur();
							setShowAnswer(!showAnswer);
						}}
						className="px-2 py-1 sm:py-1.5 sm:px-4 bg-cyan-500 text-white rounded-lg text-sm sm:text-md"
					>
						{showAnswer ? "Hide Answer" : "Show Answer"}
					</button>
					{showAnswer && (
						<span className="ml-2 font-mono text-md sm:text-lg text-red-500  tracking-widest">
							{word}
						</span>
					)}
				</div>

				<div className="absolute top-4 right-2 sm:right-5 flex items-center">
					<div className="flex items-center justify-center gap-2 sm:gap-4">
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
								className={`px-2 py-1 sm:px-4 sm:py-1.5 rounded-lg text-sm sm:text-md ${
									hintLetter
										? "bg-gray-400 cursor-not-allowed"
										: "bg-purple-500 text-white"
								}`}
								disabled={!!hintLetter}
							>
								Hint
							</button>
							{hintLetter && (
								<span className="ml-2 font-mono  text-sm sm:text-lg text-blue-500">
									{hintLetter}
								</span>
							)}
						</div>

						{/* Rules */}
						<div>
							<button
								onClick={() => setShowRules(true)}
								className="p-1 sm:p-2 text-gray-700 hover:text-black"
							>
								<FiHelpCircle size={20} className="sm:size-6" />
							</button>
						</div>
					</div>

					{/* Rules Panel */}
					{showRules && (
						<div className="fixed top-0 right-0 h-full w-50 sm:w-80 bg-white shadow-lg p-4 border-l border-gray-300 pt-5">
							<div className="flex justify-between items-center mb-4">
								<h2 className=" text-md sm:text-lg font-semibold">
									How to Play
								</h2>
								<button
									onClick={() => setShowRules(false)}
									className="text-gray-600 hover:text-black sm:mr-4 text-lg"
								>
									✖
								</button>
							</div>
							<ul className="text-sm sm:text-md space-y-2">
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
			<div className="replay-button absolute bottom-0 right-0 m-2 sm:m-4 mr-7 px-3 py-1 sm:px-4 sm:py-1.5 bg-blue-500 rounded-lg text-white text-sm sm:text-md">
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
