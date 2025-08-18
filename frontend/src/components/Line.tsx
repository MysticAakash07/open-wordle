import { motion } from "framer-motion";

type LineProps = {
	guess: string;
	colors: string[];
	animate?: boolean;
};

const Line = ({ guess = " ", colors, animate = false }: LineProps) => {
	const letters = guess.padEnd(5).split("");

	return (
		<div className="flex gap-1 sm:gap-2">
			{letters.map((ch, i) => (
				<motion.div
					key={i}
					initial={false}
					animate={
						animate
							? { rotateX: [0, 90, 0] } // flip
							: {}
					}
					transition={{
						delay: i * 0.2, // stagger
						duration: 0.5,
					}}
					className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center border text-lg sm:text-xl md:text-2xl font-bold
            ${colors[i] === "green" ? "bg-green-500 text-white" : ""}
            ${colors[i] === "yellow" ? "bg-yellow-500 text-white" : ""}
            ${colors[i] === "gray" ? "bg-gray-400 text-white" : ""}`}
				>
					{ch}
				</motion.div>
			))}
		</div>
	);
};

export default Line;
