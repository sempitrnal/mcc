import Calculator from "./components/Calculator";

function App() {
	return (
		<div className="App">
			<div className="wrapper">
				<p className="text-2">MacOS Calculator</p>
				<small className="text-3">
					You can use your <span className="font-[800]">Numpad</span>
					or <span className="font-[800]">Number keys</span> for the
					calculator :)
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
