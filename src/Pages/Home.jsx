import { useNavigate } from "react-router-dom";

export const Home = () => {
	const navigate = useNavigate();

	const buttonFunc = (e) => {
		e.preventDefault();
		console.log(e.target.form.summoner.value);
		const summonerName = e.target.form.summoner.value;
		navigate(`/summoner/${summonerName}`);
	};

	return (
		<div>
			<form>
				<label htmlFor="summoner">Enter your summoner name:</label>
				<input type="text" name="summoner" id="summoner" />
				<button onClick={buttonFunc}>Go</button>
			</form>
		</div>
	);
};
