import "./App.scss";
import { Routes } from "react-router-dom";
import { AppRouter } from "./Routing/AppRouter";
import { Header } from "./Pages/Header";
import { Footer } from "./Pages/Footer";

function App() {
	return (
		<>
			<Header />
			<AppRouter />
			<Footer />
		</>
	);
}

export default App;
