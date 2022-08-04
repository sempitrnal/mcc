import React, { useEffect, useReducer, useRef } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
export const ACTIONS = {
	ADD_DIGIT: "add-digit",
	CLEAR: "clear",
	PERCENT: "percent",
	DELETE_DIGIT: "delete-digit",
	CHOOSE_OPERATION: "choose-operation",
	EVALUATE: "evaluate",
	NEGATE: "negate",
};

function reducer(state, { type, payload }) {
	switch (type) {
		case ACTIONS.ADD_DIGIT:
			console.log(typeof state.currentOperand);
			if (payload.digit === "0" && state.currentOperand === "0")
				return state;

			if (payload.digit === "." && state.currentOperand.includes("."))
				return state;

			if (
				payload.digit !== "0" &&
				payload.digit !== "." &&
				state.currentOperand === "0"
			)
				return {
					...state,
					currentOperand: payload.digit,
				};

			return {
				...state,
				currentOperand: `${state.currentOperand || ""}${
					payload.digit
				}`,
			};
		case ACTIONS.DELETE_DIGIT:
			const newCurr = state.currentOperand;

			return {
				...state,
				currentOperand: newCurr.slice(0, -1),
			};
		case ACTIONS.CHOOSE_OPERATION:
			if (
				state.currentOperand == null &&
				state.previousOperand == null
			) {
				return state;
			}
			if (
				state.currentOperand === "0" &&
				state.previousOperand == null
			) {
				return state;
			}
			if (state.currentOperand === "0")
				return {
					...state,
					operation: payload.operation,
				};

			if (state.previousOperand == null) {
				return {
					...state,
					operation: payload.operation,
					previousOperand: state.currentOperand,
					currentOperand: "0",
				};
			}
			return {
				...state,
				previousOperand: evaluate(state),
				operation: payload.operation,
				currentOperand: "0",
			};
		case ACTIONS.CLEAR:
			return {
				currentOperand: "0",
			};
		case ACTIONS.PERCENT:
			console.log(state.currentOperand);
			if (state.previousOperand == null) {
				return {
					currentOperand: (state.currentOperand / 100).toString(),
				};
			}
			return {
				currentOperand: evaluate(state) / 100,
			};
		case ACTIONS.EVALUATE:
			console.log(typeof state.currentOperand);
			if (state.previousOperand == null || state.operation == null) {
				return {
					currentOperand: formatOperand(state.currentOperand),
				};
			}
			return {
				currentOperand: evaluate(state),
			};
		case ACTIONS.NEGATE:
			return {
				...state,
				currentOperand: (
					parseFloat(state.currentOperand) * -1
				).toString(),
			};
		default:
			return state;
	}
}

function evaluate({ currentOperand, previousOperand, operation }) {
	const prev = parseFloat(previousOperand);
	const current = parseFloat(currentOperand);
	if (isNaN(prev) || isNaN(current)) return "";
	let computation = "";
	switch (operation) {
		case "+":
			computation = prev + current;
			break;
		case "-":
			computation = prev - current;
			break;
		case "×":
			computation = prev * current;
			break;
		case "÷":
			computation = prev / current;
			break;
		default:
			return;
	}
	return computation.toString();
}
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
	maximumFractionDigits: 0,
});

function formatOperand(operand) {
	if (operand == null) return;
	let [integer, decimal] = operand.split(".");
	if (integer.includes(",")) {
		integer = integer
			.split(",")
			.filter((e) => e !== ",")
			.join("");
	}
	console.log(integer);
	if (decimal == null) return INTEGER_FORMATTER.format(integer);
	return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function Calculator() {
	const [{ currentOperand, previousOperand, operation }, dispatch] =
		useReducer(reducer, { currentOperand: "0" });
	const equal = useRef();
	const digit0 = useRef();
	const digit1 = useRef();
	const digit2 = useRef();
	const digit3 = useRef();
	const digit4 = useRef();
	const digit5 = useRef();
	const digit6 = useRef();
	const digit7 = useRef();
	const digit8 = useRef();
	const digit9 = useRef();
	const period = useRef();
	const plus = useRef();
	const minus = useRef();
	const times = useRef();
	const divide = useRef();
	const percent = useRef();
	const del = useRef();
	useEffect(() => {
		window.addEventListener("keydown", (e) => {
			if (e.key === "0") {
				digit0.current.click();
			}
			if (e.key === "1") {
				digit1.current.click();
			}
			if (e.key === "2") {
				digit2.current.click();
			}
			if (e.key === "3") {
				digit3.current.click();
			}
			if (e.key === "4") {
				digit4.current.click();
			}
			if (e.key === "5") {
				digit5.current.click();
			}
			if (e.key === "6") {
				digit6.current.click();
			}
			if (e.key === "7") {
				digit7.current.click();
			}
			if (e.key === "8") {
				digit8.current.click();
			}
			if (e.key === "9") {
				digit9.current.click();
			}
			if (e.key === "Period") {
				period.current.click();
			}
			if (e.key === "Enter" || e.key === "=") {
				equal.current.click();
				digit0.current.blur();
				digit1.current.blur();
				digit2.current.blur();
				digit3.current.blur();
				digit4.current.blur();
				digit5.current.blur();
				digit6.current.blur();
				digit7.current.blur();
				digit8.current.blur();
				digit9.current.blur();
				plus.current.blur();
				minus.current.blur();
				times.current.blur();
				divide.current.blur();
				percent.current.blur();
			}
			if (e.key === "+") {
				plus.current.click();
			}
			if (e.key === "-") {
				minus.current.click();
			}
			if (e.key === "*") {
				times.current.click();
			}
			if (e.key === "/") {
				divide.current.click();
			}
			if (e.key === "%") {
				percent.current.click();
			}
			if (e.key === "Backspace") {
				del.current.click();
			}
		});
	}, []);

	return (
		<div className="">
			<button
				className="hidden"
				ref={del}
				onClick={() => {
					dispatch({ type: ACTIONS.DELETE_DIGIT });
				}}
			></button>
			<div className="calculator-grid ">
				<div className="output">
					<div className="previous-operand">
						{formatOperand(previousOperand)} {operation}
					</div>
					<div className="current-operand">
						{formatOperand(currentOperand)}
					</div>
				</div>
				<OperationButton operation="AC" dispatch={dispatch} />
				<OperationButton operation="+/-" dispatch={dispatch} />
				<OperationButton
					fak={percent}
					operation="%"
					dispatch={dispatch}
				/>
				<OperationButton
					fak={divide}
					operation="÷"
					dispatch={dispatch}
				/>

				<DigitButton fak={digit7} digit="7" dispatch={dispatch} />
				<DigitButton fak={digit8} digit="8" dispatch={dispatch} />
				<DigitButton fak={digit9} digit="9" dispatch={dispatch} />

				<OperationButton
					fak={times}
					operation="×"
					dispatch={dispatch}
				/>

				<DigitButton fak={digit4} digit="4" dispatch={dispatch} />
				<DigitButton fak={digit5} digit="5" dispatch={dispatch} />
				<DigitButton fak={digit6} digit="6" dispatch={dispatch} />

				<OperationButton
					fak={plus}
					operation="+"
					dispatch={dispatch}
				/>

				<DigitButton fak={digit1} digit="1" dispatch={dispatch} />
				<DigitButton fak={digit2} digit="2" dispatch={dispatch} />
				<DigitButton fak={digit3} digit="3" dispatch={dispatch} />

				<OperationButton
					fak={minus}
					operation="-"
					dispatch={dispatch}
				/>

				<DigitButton fak={digit0} digit="0" dispatch={dispatch} />
				<DigitButton fak={period} digit="." dispatch={dispatch} />

				<button
					ref={equal}
					className="bg-[#FF9E0B] rounded-br-xl"
					onClick={() => {
						dispatch({ type: ACTIONS.EVALUATE });
					}}
				>
					=
				</button>
			</div>
		</div>
	);
}

export default Calculator;
