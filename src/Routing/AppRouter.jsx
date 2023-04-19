import { Routes, Route } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Summoner } from "../Pages/Summoner";

export const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route index element={<Home />} />
				<Route path="/summoner/:summoner_name" element={<Summoner />} />
			</Routes>
		</>
	);
};
