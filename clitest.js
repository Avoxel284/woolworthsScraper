let chalk = require("chalk");
let inquirer = require("inquirer");
let scraper = require("./index.js");

function main() {
	inquirer
		.prompt({
			message: "Search for a product",
			name: "searchProduct",
		})
		.then(async (q) => {
			let products = await scraper.searchWoolworths(q.searchProduct);
			products.forEach((p) => {
				console.log(`${chalk.bold(p.name)} [${p.brand}] - ${chalk.cyanBright(`$${p.price}`)}`);
			});
			main();
		});
}

main();
