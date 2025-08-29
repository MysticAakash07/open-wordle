interface KeyBoardProps {
	onKeyClick: (key: string) => void;
}

const KeyBoard = ({ onKeyClick }: KeyBoardProps) => {
	const rows = [
		["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
		["A", "S", "D", "F", "G", "H", "J", "K", "L"],
		["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
	];

	return (
		<div className=" m-2 sm:m-4 p-2 w-full flex flex-col items-center gap-2 select-none ">
			{rows.map((row, rowIndex) => (
				<div key={rowIndex} className="flex justify-center gap-1">
					{row.map((key) => (
						<button
							key={key}
							onClick={() => onKeyClick(key)}
							className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md shadow-sm font-semibold text-sm sm:text-md
							 ${
									key === "Enter"
										? "bg-green-400 active:bg-green-500"
										: key === "Backspace"
										? "bg-red-400 active:bg-red-500"
										: "bg-gray-200 active:bg-gray-400"
								}
							`}
						>
							{key}
						</button>
					))}
				</div>
			))}
		</div>
	);
};

export default KeyBoard;
