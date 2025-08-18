import Line from "./Line";

interface Props {
	guesses: string[];
	colors: string[][];
	currentRow: number;
	currentGuess: string;
	animatedRows: boolean[];
}

export default function GameBoard({
	guesses,
	colors,
	currentRow,
	currentGuess,
	animatedRows,
}: Props) {
	return (
		<div className="flex flex-col gap-1 sm:gap-2 items-center">
			{guesses.map((guess, i) => (
				<Line
					key={i}
					guess={i === currentRow ? currentGuess : guess}
					colors={colors[i]}
					animate={animatedRows[i]}
				/>
			))}
		</div>
	);
}
