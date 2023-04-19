import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Summoner = () => {
	const params = useParams();
	const [summonerData, setSummonerData] = useState();
	const apiKey = import.meta.env.VITE_API_KEY;
	const summonerCall =
		`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${params.summoner_name}` +
		`?api_key=` +
		`${apiKey}`;

	useEffect(() => {
		axios
			.get(summonerCall)
			.then((res) => {
				setSummonerData(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	if (summonerData === undefined) {
		return <div>Loading...</div>;
	}

	return (
		<>
			{console.log(summonerData)}
			<div>
				Id:
				<br />
				{summonerData.id}
			</div>
			<br />
			<div>
				Account Id:
				<br />
				{summonerData.accountId}
			</div>
			<br />
			<div>
				Account name:
				<br />
				{summonerData.name}
			</div>
			<br />
			<div>
				Profile Icon:
				<br />
				{summonerData.profileIconId}
			</div>
			<br />
			<div>
				puuid:
				<br />
				{summonerData.puuid}
			</div>
			<br />
			<div>
				level:
				<br />
				{summonerData.summonerLevel}
			</div>
		</>
	);
};
