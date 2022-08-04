import { ACTIONS } from "./Calculator";

export default function OperationButton({
	operation,
	dispatch,
	fak,
}) {
	return (
		<button
			ref={fak}
			className={`${
				operation === "÷" ||
				operation === "+" ||
				operation === "-" ||
				operation === "=" ||
				operation === "×"
					? "bg-[#FF9E0B]"
					: ""
			} ${operation === "=" ? "rounded-br-xl" : ""}
			${
				operation === "+/-" || operation === "%" || operation === "AC"
					? "bg-[#3C3C40]"
					: ""
			}`}
			onClick={() => {
				dispatch({
					type:
						operation === "AC"
							? ACTIONS.CLEAR
							: operation === "%"
							? ACTIONS.PERCENT
							: operation === "+/-"
							? ACTIONS.NEGATE
							: ACTIONS.CHOOSE_OPERATION,
					payload: { operation },
				});
			}}
		>
			{operation}
		</button>
	);
}
