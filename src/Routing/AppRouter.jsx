import { Routes, Route } from "react-router-dom";
import { Home } from "../Pages/Home";

export const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route index element={<Home />} />
			</Routes>
		</>
	);
};
