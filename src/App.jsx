import "./App.css";
import { Routes } from "react-router-dom";
import { AppRouter } from "./Routing/AppRouter";

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
	return (
		<>
			<AppRouter />
		</>
	);
}

export default App;
