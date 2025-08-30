import { FaBackspace, FaLevelDownAlt } from "react-icons/fa";

interface KeyBoardProps {
	onKeyClick: (key: string) => void;
}

const KeyBoard = ({ onKeyClick }: KeyBoardProps) => {
	const rows: string[][] = [
		["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
		["A", "S", "D", "F", "G", "H", "J", "K", "L"],
		["Z", "X", "C", "V", "B", "N", "M", "Enter", "Backspace"],
	];

	const handleClick = (key: string, e: React.MouseEvent<HTMLButtonElement>) => {
		e.currentTarget.blur(); 
		onKeyClick(key);
	};

	return (
		<div className="m-2 sm:m-4 p-2 w-full max-w-md flex flex-col items-center gap-2 select-none">
			{rows.map((row, rowIndex) => (
				<div key={rowIndex} className="flex w-full justify-center gap-1">
					{row.map((key) => (
						<button
							key={key}
							onClick={(e) => handleClick(key, e)}
							className={`flex-1 min-w-[9%] sm:min-w-[40px] md:min-w-[60px] px-1.5 py-2.5 sm:px-2 sm:py-3 rounded-md shadow-sm font-semibold text-xs sm:text-sm md:text-base select-none 
								${
									key === "Enter"
										? "bg-green-400 active:bg-green-500"
										: key === "Backspace"
										? "bg-red-400 active:bg-red-500"
										: "bg-gray-200 active:bg-gray-400"
								}
							`}
						>
							{key === "Backspace" ? (
								<FaBackspace className="mx-auto text-base sm:text-lg" />
							) : key === "Enter" ? (
								<FaLevelDownAlt
									rotate={90}
									className="mx-auto text-base sm:text-lg rotate-90 "
								/>
							) : (
								key
							)}
						</button>
					))}
				</div>
			))}
		</div>
	);
};

export default KeyBoard;
