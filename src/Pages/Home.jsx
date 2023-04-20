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

	// API calls for the champion IDs and data
	const championIdCall =
		`https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=` +
		`${apiKey}`;
	const championDataCall =
		"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json";

	// Use the useEffect hook to make the API calls once the component is mounted
	useEffect(() => {
		axios
			.get(championIdCall)
			.then((res) => {
				setChampionId(res.data.freeChampionIds);
			})
			.catch((err) => {
				console.error(err);
			});

		axios
			.get(championDataCall)
			.then((res) => {
				setChampionData(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	// Once the champion IDs and data have been fetched, filter the champions based on their IDs
	if (championData && championId) {
		const filteredChampions = championId.map((id) =>
			championData.find((champion) => champion.id === id)
		);
		console.log(filteredChampions);
	}

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
			</div>
		</>
	);
};
