import { useQuery } from "react-query";
import { fetchChartHistory } from "../api";
import ApexChart from "react-apexcharts";
import { Helmet } from "react-helmet";
import { isDarkAtom } from "../atoms";
// import { useRecoilValue } from "recoil";

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

function Chart({ coinId }: IChartProps) {
	// const isDark = useRecoilValue(isDarkAtom);
	const { isLoading, data } = useQuery<IChartHistory[]>(
		["chartHistory", coinId],
		() => fetchChartHistory(coinId),
		{
			refetchInterval: 10000,
		}
	);
	return (
		<div>
			<Helmet>
				<title>Coin Chart</title>
			</Helmet>
			{isLoading ? (
				"Loading Chart..."
			) : (
				<ApexChart
					type="line"
					series={[
						{
							name: "high",
							data: data?.map((price) => price.high),
						},
						{
							name: "low",
							data: data?.map((price) => price.low),
						},
						{
							name: "close",
							data: data?.map((price) => price.close),
						},
					]}
					options={{
						chart: {
							height: 500,
							width: 500,
							toolbar: {
								show: false,
							},
							background: "transparent",
						},
						theme: {
							mode: isDarkAtom ? "dark" : "light",
						},
						stroke: { width: 3 },
						yaxis: {
							decimalsInFloat: 2,
						},
						xaxis: {
							type: "datetime",
							categories: data?.map((date) => (date.time_close as any) * 1000),
						},
						tooltip: {
							y: {
								formatter: (value) => `$${value.toFixed(2)}`,
							},
						},
					}}
				/>
			)}
		</div>
	);
}

export default Chart;

// // This function formats the date to MM-DD
// function getYmd10(date: IChartHistory) {
// 	var d = new Date(date.time_close);
// 	return (
// 		(d.getMonth() + 1 > 9
// 			? (d.getMonth() + 1).toString()
// 			: "0" + (d.getMonth() + 1)) +
// 		"-" +
// 		(d.getDate() > 9 ? d.getDate().toString() : "0" + d.getDate().toString())
// 	);
// }
// // this 'date' array will be used for x-axis
// const date = data?.map((date) => getYmd10(date));
