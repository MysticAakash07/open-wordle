import { motion } from "framer-motion";

type LineProps = {
	guess: string;
	colors: string[];
	animate?: boolean;
};

const Line = ({ guess = " ", colors, animate = false }: LineProps) => {
	const letters = guess.padEnd(5).split("");

	return (
		<div className="flex gap-2">
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
					className={`w-12 h-12 flex items-center justify-center border text-xl font-bold
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
