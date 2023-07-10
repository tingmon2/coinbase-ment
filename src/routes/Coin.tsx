import { Link, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { Switch, Route } from "react-router";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { Helmet } from "react-helmet";

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

const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.textColor};
	margin-left: 10px;
`;

const Loading = styled.h1`
	text-align: center;
	font-size: 48px;
	display: block;
	color: ${(props) => props.theme.accentColor};
`;

const TitleImage = styled.img`
	width: 50px;
	height: 50px;
`;

const Overview = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: ${(props) => props.theme.coinBackground};
	padding: 10px 20px;
	border-radius: 10px;
`;
const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	span:first-child {
		font-size: 10px;
		font-weight: 400;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
`;
const Description = styled.p`
	margin: 20px 0px;
`;

const Tabs = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 25px 0px;
	gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
	text-align: center;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 400;
	background-color: ${(props) => props.theme.coinBackground};
	padding: 7px 0px;
	border-radius: 10px;
	color: ${(props) =>
			props.isActive ? props.theme.accentColor : props.theme.textColor}
		a {
		display: block;
	}
`;

const GoHome = styled.span`
	text-align: center;
	text-transform: uppercase;
	font-size: 15px;
	font-weight: 400;
	background-color: ${(props) => props.theme.coinBackground};
	padding: 7px 0px;
	border-radius: 10px;
	a {
		display: block;
		margin-top: 20px;
		padding: 15px;
		background-color: ${(props) => props.theme.coinBackground};
		border-radius: 10px;
	}
`;

interface RouteParams {
	coinId: string;
}

interface RouteState {
	name: string;
	src: string;
}

interface ITag {
	coin_counter: number;
	ico_counter: number;
	id: string;
	name: string;
}

interface ITeam {
	id: string;
	name: string;
	position: string;
}

interface InfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	contract: string;
	platform: string;
	contracts: object;
	parent: object;
	tags: ITag[];
	team: ITeam[];
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	links: object;
	links_extended: object;
	whitepaper: object;
	first_data_at: string;
	last_data_at: string;
}

interface PriceData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	};
}

function Coin() {
	// fetch the parameter of url -> path="/:coinId"
	const { coinId } = useParams<RouteParams>();
	// To use the state that is from 'Coins'
	const location = useLocation<RouteState>();
	// To see where the router is
	const priceMatch = useRouteMatch(`/${coinId}/price`);
	const chartMatch = useRouteMatch(`/${coinId}/chart`);

	const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
		["coinInfo", coinId],
		() => fetchCoinInfo(coinId)
	);
	const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(
		["coinPrice", coinId],
		() => fetchCoinPrice(coinId),
		{
			refetchInterval: 10000,
		}
	);

	const loading = infoLoading || priceLoading;

	return (
		<Container>
			<Helmet>
				<title>
					{location.state?.name ? (
						location.state.name
					) : loading ? (
						<Loading>Loading...</Loading>
					) : (
						infoData?.name
					)}
				</title>
			</Helmet>
			<GoHome>
				<Link to={"/"}>Home</Link>
			</GoHome>
			<Header>
				<Header>
					<TitleImage
						src={
							location.state?.src ||
							`https://coinicons-api.vercel.app/api/icon/${infoData?.symbol.toLowerCase()}`
						}
					/>
					<Title>
						{location.state?.name ? (
							location.state.name
						) : loading ? (
							<Loading>Loading...</Loading>
						) : (
							infoData?.name
						)}
					</Title>
				</Header>
			</Header>
			{loading ? (
				<Loading>Loading...</Loading>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<span>Rank:</span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Symbol:</span>
							<span>${infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Price:</span>
							<span>{priceData?.quotes.USD.price.toFixed(2)}</span>
						</OverviewItem>
					</Overview>
					<Description>{infoData?.description}</Description>
					<Overview>
						<OverviewItem>
							<span>Total Suply:</span>
							<span>{priceData?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Supply:</span>
							<span>{priceData?.max_supply}</span>
						</OverviewItem>
					</Overview>
					<Tabs>
						<Tab isActive={chartMatch !== null}>
							<Link to={`/${coinId}/chart`}>Line Chart</Link>
						</Tab>
						<Tab isActive={priceMatch !== null}>
							<Link to={`/${coinId}/price`}>Candle Stick Chart</Link>
						</Tab>
					</Tabs>
					<Switch>
						<Route path={`/${coinId}/price`}>
							<Price coinId={coinId} />
						</Route>
						<Route path={`/${coinId}/chart`}>
							<Chart coinId={coinId} />
						</Route>
					</Switch>
				</>
			)}
		</Container>
	);
}

export default Coin;
