import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { fetchChartHistory } from "../api";
import { Helmet } from "react-helmet";
import { isDarkAtom } from "../atoms";

interface IChartProps {
	coinId: string;
}

interface IChartHistory {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

function Price({ coinId }: IChartProps) {
	const { isLoading, data } = useQuery<IChartHistory[]>(
		["priceHistory", coinId],
		() => fetchChartHistory(coinId),
		{
			refetchInterval: 10000,
		}
	);

	const date = data?.map((date) => new Date((date.time_close as any) * 1000));
	const open = data?.map((price) => price.open);
	const high = data?.map((price) => price.high);
	const low = data?.map((price) => price.low);
	const close = data?.map((price) => price.close);

	console.log(data);

	console.log(date);
	console.log(typeof date);
	console.log(open);
	console.log(open?.at(0));

	return (
		<div>
			<Helmet>
				<title>Coin Price</title>
			</Helmet>
			{isLoading ? (
				"Loading Chart..."
			) : (
				<ApexChart
					type="candlestick"
					options={{
						plotOptions: {
							candlestick: {
								colors: {
									upward: "#0ca2f8",
									downward: "#89f002",
								},
								wick: {
									useFillColor: true,
								},
							},
						},
						chart: {
							width: 500,
							height: 500,
							background: "transparent",
						},
						theme: {
							mode: isDarkAtom ? "dark" : "light",
						},
						title: { text: "Price Chart", align: "left" },
						xaxis: {
							type: "datetime",
							tooltip: {
								enabled: true,
							},
							tickAmount: 6,
						},
						yaxis: {
							decimalsInFloat: 2,
							tooltip: {
								enabled: true,
							},
							tickAmount: 5,
						},
						tooltip: {
							y: {
								formatter: (value) => `$${value.toFixed(2)}`,
							},
						},
					}}
					series={[
						{
							data: [
								{
									x: date?.at(7),
									y: [open?.at(7), high?.at(7), low?.at(7), close?.at(7)],
								},
								{
									x: date?.at(8),
									y: [open?.at(8), high?.at(8), low?.at(8), close?.at(8)],
								},
								{
									x: date?.at(9),
									y: [open?.at(9), high?.at(9), low?.at(9), close?.at(9)],
								},
								{
									x: date?.at(10),
									y: [open?.at(10), high?.at(10), low?.at(10), close?.at(10)],
								},
								{
									x: date?.at(11),
									y: [open?.at(11), high?.at(11), low?.at(11), close?.at(11)],
								},
								{
									x: date?.at(12),
									y: [open?.at(12), high?.at(12), low?.at(12), close?.at(12)],
								},
								{
									x: date?.at(13),
									y: [open?.at(13), high?.at(13), low?.at(13), close?.at(13)],
								},
								{
									x: date?.at(14),
									y: [open?.at(14), high?.at(14), low?.at(14), close?.at(14)],
								},
								{
									x: date?.at(15),
									y: [open?.at(15), high?.at(15), low?.at(15), close?.at(15)],
								},
								{
									x: date?.at(16),
									y: [open?.at(16), high?.at(16), low?.at(16), close?.at(16)],
								},
								{
									x: date?.at(17),
									y: [open?.at(17), high?.at(17), low?.at(17), close?.at(17)],
								},
								{
									x: date?.at(18),
									y: [open?.at(18), high?.at(18), low?.at(18), close?.at(18)],
								},
								{
									x: date?.at(19),
									y: [open?.at(19), high?.at(19), low?.at(19), close?.at(19)],
								},
								{
									x: date?.at(20),
									y: [open?.at(20), high?.at(20), low?.at(20), close?.at(20)],
								},
							],
						},
					]}
				/>
			)}
		</div>
	);
}

export default Price;
