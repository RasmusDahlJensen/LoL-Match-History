import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.scss";

export const Home = () => {
	const navigate = useNavigate(); // Initialize necessary variables
	const apiKey = import.meta.env.VITE_API_KEY; // Get the API key from the environment variable
	// Initialize the state variables
	const [championId, setChampionId] = useState([]);
	const [championData, setChampionData] = useState([]);
	const [filteredChampions, setFilteredChampions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// Function to handle the button click event
	const buttonFunc = (e) => {
		e.preventDefault(); // Prevent the default form submission
		const summonerName = e.target.form.summoner.value; // Get the summoner name from the form input
		navigate(`/summoner/${summonerName}`); // Navigate to the /summoner route with the provided summoner name
	};

	// Fetch champion rotation data from the Riot API and the champion data from Community Dragon API
	useEffect(() => {
		const championIdCall = `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${apiKey}`;
		const championDataCall =
			"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json";

		// Use Promise.all to wait for both API calls to complete before updating state
		Promise.all([axios.get(championIdCall), axios.get(championDataCall)])
			.then(([championIdRes, championDataRes]) => {
				setChampionId(championIdRes.data.freeChampionIds);
				setChampionData(championDataRes.data);
				setIsLoading(false); // Set loading state to false when both API calls have completed
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	// Filter the champion data to only include the free champions
	useEffect(() => {
		// Ensure both data sets are loaded
		if (championData && championId && isLoading === false) {
			const champions = championId.map((id) =>
				championData.find((champion) => champion.id === id)
			);

			// Ensure all free champions are included
			if (champions.length === championId.length) {
				setFilteredChampions(champions); // Set the filteredChampions state variable to the filtered data
			}
		}
	}, [championData, championId]);

	return (
		<>
			<section>
				<h2>Match History</h2>
				<form>
					<div>
						<input
							type="text"
							name="summoner"
							id="summoner"
							placeholder="Search"
						/>
						<button onClick={buttonFunc}>Go</button>
					</div>
				</form>
			</section>

			<div>
				<h3>Free champion rotation</h3>
				{filteredChampions &&
				isLoading === false &&
				filteredChampions.length === championId.length ? (
					<div>
						{filteredChampions.map((champion) => (
							<p key={champion.id}>{champion.name}</p>
						))}
					</div>
				) : (
					<div>Loading...</div>
				)}
			</div>
		</>
	);
};
