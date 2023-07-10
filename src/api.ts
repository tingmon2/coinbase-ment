export async function fetchCoins() {
	const response = await fetch(`https://api.coinpaprika.com/v1/coins`);
	const json = await response.json();
	return json;
}

export async function fetchCoinInfo(coinId: string) {
	const response = await fetch(
		`https://api.coinpaprika.com/v1/coins/${coinId}`
	);
	const json = await response.json();
	return json;
}

export async function fetchCoinPrice(coinId: string) {
	const response = await fetch(
		`https://api.coinpaprika.com/v1/tickers/${coinId}`
	);
	const json = await response.json();
	return json;
}

export async function fetchChartHistory(coinId: string) {
	// 지금 현재 시간을 초로 보냄
	// const endDate = Math.floor(Date.now() / 1000);
	// // 현재 시간에서 2주 전 기록까지 60초*60분*24시간*14일
	// const startDate = Math.floor(endDate - 60 * 60 * 24 * 13);
	// const response = await fetch(
	// 	`https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
	// );
	const response = await fetch(
		`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
	);
	const json = await response.json();
	return json;
}
