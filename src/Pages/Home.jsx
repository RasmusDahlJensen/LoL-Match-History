import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.scss";

// Get the API key from the environment variables
const apiKey = import.meta.env.VITE_API_KEY;

export const Home = () => {
	// Use the react-router-dom hook to navigate between pages
	const navigate = useNavigate();

	// Function to handle the form submission
	const buttonFunc = (e) => {
		e.preventDefault();
		console.log(e.target.form.summoner.value);
		const summonerName = e.target.form.summoner.value;
		// Navigate to the summoner page with the provided summoner name
		navigate(`/summoner/${summonerName}`);
	};

	// Set up state variables for the champion IDs and data
	const [championId, setChampionId] = useState([]);
	const [championData, setChampionData] = useState([]);
	const [filteredChampions, setFilteredChampions] = useState([]);

	// API calls for the champion IDs and data
	const championIdCall =
		`https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=` +
		`${apiKey}`;
	const championDataCall =
		"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json";

	// Use the useEffect hook to make the API calls once the component is mounted
	useEffect(() => {
		// Call API to get rotation champion IDs
		axios
			.get(championIdCall)
			.then((res) => {
				setChampionId(res.data.freeChampionIds);
			})
			.catch((err) => {
				console.error(err);
			});
		// Call API to get free champion IDs
		axios
			.get(championDataCall)
			.then((res) => {
				setChampionData(res.data);
				handleFilter();
			})
			.catch((err) => {
				console.error(err);
			});

		const handleFilter = () => {
			// Filter the champions data by IDs and set the state with the filtered data
			if (championData && championId) {
				const champions = championId.map((id) =>
					championData.find((champion) => champion.id === id)
				);
				if (champions.length === championId.length) {
					setFilteredChampions(champions);
				}
			}
		};
	}, []);

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
				{filteredChampions.length === championId.length ? (
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
