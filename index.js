// Avoxel284
// Search items on Woolworths
let axios = require("axios").default;
let fs = require("fs");

exports.searchWoolworths = async function searchItem(query, page = 1, limit = 36) {
	const { data } = await axios({
		method: "post",
		url: "https://www.woolworths.com.au/apis/ui/Search/products",
		headers: {
			authority: "www.woolworths.com.au",
			accept: "application/json, text/plain, */*",
			"accept-language": "en-US,en;q=0.9",
			"cache-control": "no-cache",
			"content-type": "application/json",
			cookie: fs.readFileSync("./cookie.txt"),
			dnt: "1",
			origin: "https://www.woolworths.com.au",
			pragma: "no-cache",
			referer: `https://www.woolworths.com.au/shop/search/products?searchTerm=${query}`,
			"request-id": "|89849c8c473848088d6ef09e21c38d53.d25df43cec514f6b",
			"sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": '"macOS"',
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
			// traceparent: "00-89849c8c473848088d6ef09e21c38d53-d25df43cec514f6b-01",
			"user-agent":
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
		},
		data: JSON.stringify({
			Filters: [],
			IsSpecial: false,
			Location: `/shop/search/products?searchTerm=${query}`,
			PageNumber: page,
			PageSize: limit,
			SearchTerm: query,
			SortType: "TraderRelevance",
		}),
	}).catch(function (error) {
		console.log(error);
	});

	if (!data?.["Products"]) return null;
	let products = [];
	data["Products"].forEach((p) => {
		products.push({
			name: p.Name,
			displayName: p.DisplayName,
			description: p.Products[0].Description,
			price: p.Products[0].Price,
			brand: p.Products[0].Brand,
			barcode: p.Products[0].Barcode,
			cup: {
				cupPrice: p.Products[0].HasCupPrice,
				cupMeasure: p.Products[0].CupMeasure,
				cupPrice: p.Products[0].CupPrice,
			},
			new: p.Products[0].IsNew,
			special: {
				onSpecial: p.Products[0].IsOnSpecial,
			},
		});
	});

	return products;
};
