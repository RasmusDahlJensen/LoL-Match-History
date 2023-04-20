import logo from "../Assets/Logo.svg";
import "./Header.scss";
import { Link } from "react-router-dom";

export const Header = () => {
	return (
		<header>
			<Link to="/">
				<figure>
					<img src={logo}></img>
					<h1>Match History</h1>
				</figure>
			</Link>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/">Leaderboards</Link>
				<Link to="/">Champions</Link>
			</nav>
		</header>
	);
};
