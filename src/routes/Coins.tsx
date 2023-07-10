import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { ToggleButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { isDarkAtom } from "../atoms";
import { useSetRecoilState } from "recoil";

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Header = styled.header`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
	background-color: whitesmoke;
	color: ${(props) => props.theme.listColor};
	margin-bottom: 10px;
	padding: 20px;
	border-radius: 15px;
	a {
		padding: 5px;
		transition: color 0.2s ease-in;
		display: flex;
		align-items: center;
	}
	&:hover {
		a {
			color: ${(props) => props.theme.accentColor};
		}
	}
`;

const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.textColor};
`;

const Loading = styled.h1`
	text-align: center;
	font-size: 48px;
	display: block;
	color: ${(props) => props.theme.accentColor};
`;

const CoinImage = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 15px;
`;

const Toggle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	background-color: ${(props) => props.theme.bgColor};
	border-radius: 10px;
	margin-bottom: 10px;
`;

interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

function Coins() {
	const { isLoading, data } = useQuery<ICoin[]>("CoinData", fetchCoins);
	// this 'useSetRecoilState' is same as 'setState' -> able to use 'prev'
	const setDarkAtom = useSetRecoilState(isDarkAtom);

	return (
		<Container>
			<Helmet>
				<title>Coin Basement</title>
			</Helmet>
			{/* <Tab>
				<button>Toggle Mode</button>
			</Tab> */}
			<Header>
				<Title>Coin Basement</Title>
			</Header>
			<Toggle>
				<ToggleButton
					size="small"
					color="standard"
					value="check"
					selected={true}
					onChange={() => {
						setDarkAtom((prev) => !prev);
					}}
				>
					<span>Dark/Light</span>
					<CheckIcon />
				</ToggleButton>
			</Toggle>

			{isLoading ? (
				<Loading>Loading...</Loading>
			) : (
				<CoinList>
					{data?.slice(0, 100).map((coin) => (
						<Coin key={coin.id}>
							<Link
								to={{
									pathname: `/${coin.id}`,
									state: {
										name: coin.name,
										src: `https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`,
									},
								}}
							>
								<CoinImage
									src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
								/>
								{coin.name} &rarr;
							</Link>{" "}
						</Coin>
					))}
				</CoinList>
			)}
		</Container>
	);
}

export default Coins;
