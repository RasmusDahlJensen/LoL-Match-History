import React from "react";
import axios from "axios"; // import axios for making HTTP requests
import { useState, useEffect } from "react"; // import useState and useEffect hooks from React
import { useParams } from "react-router-dom"; // import useParams hook from React Router

export const Summoner = () => {
	// use the useParams hook to get the summoner_name parameter from the URL
	const params = useParams();

	// use the useState hook to create a state variable called summonerData
	// initialize it to undefined because we don't have any data yet
	const [summonerData, setSummonerData] = useState();

	// get the Riot API key from an environment variable
	const apiKey = import.meta.env.VITE_API_KEY;

	// create the API endpoint URL using the summoner_name parameter and the API key
	const summonerCall =
		`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${params.summoner_name}` +
		`?api_key=` +
		`${apiKey}`;

	// use the useEffect hook to make the API request and update the summonerData state variable
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

	// if summonerData is undefined, render a "Loading..." message
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
