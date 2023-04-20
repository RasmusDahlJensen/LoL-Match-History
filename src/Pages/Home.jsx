import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.scss";

const apiKey = import.meta.env.VITE_API_KEY;

export const Home = () => {
	const navigate = useNavigate();

	const buttonFunc = (e) => {
		e.preventDefault();
		console.log(e.target.form.summoner.value);
		const summonerName = e.target.form.summoner.value;
		navigate(`/summoner/${summonerName}`);
	};

	const [championId, setChampionId] = useState([]);
	const [championData, setChampionData] = useState([]);

	const championIdCall =
		`https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=` +
		`${apiKey}`;

	const championDataCall =
		"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json";

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
				{/* {console.log(championData)} */}
				{/* {console.log(championId)} */}
			</div>
		</>
	);
};
