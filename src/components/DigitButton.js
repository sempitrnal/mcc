import { ACTIONS } from "./Calculator";

export default function DigitButton({ dispatch, digit, fak }) {
	return (
		<button
			ref={fak}
			className={`${digit === "0" ? "col-span-2 rounded-bl-xl" : ""}`}
			onClick={() => {
				dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
			}}
		>
			{digit}
		</button>
	);
}
