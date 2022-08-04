import Calculator from "./components/Calculator";

function App() {
	return (
		<div className="App">
			<div className="wrapper">
				<p className="text-2">MacOS Calculator</p>
				<small className="text-3">
					You can use your <span className="font-[800]">Numpad </span>
					or{" "}
					<span className="font-[800]">
						Number and operator keys{" "}
					</span>{" "}
					for the calculator :)
				</small>
				<small className="text-4 flex flex-col">
					<div className="">
						<span className="font-extrabold">
							A or C <span className="mx-1">=</span>{" "}
						</span>
						All Clear
					</div>
					<div className="flex items-center">
						<span className="font-bold text-lg">⌫ </span>{" "}
						<span className="font-extrabold mx-1"> = </span>
						Delete
					</div>
					<div className="flex items-center">
						<span className="font-extrabold ">N </span>{" "}
						<span className="font-extrabold mx-1"> = </span>
						Toggle +/-
					</div>
				</small>
				<Calculator />
				<p className="text">
					Made with <span className="mr-1 ml-[2px]">🤍</span> by{" "}
					<span className="font-semibold">Bo Sampelo</span>
				</p>
			</div>
		</div>
	);
}

export default App;
