window.onload = async () => {
	//Можно лучше: некорректное наименование переменной.
	const list = document.querySelector(`.left-block`);

    async function load() {
        const APIKey = '5484cbebeea545c1629a3384daf443af'
        const fetchLatestRates = fetch('http://data.fixer.io/api/latest?access_key=' + APIKey);
        const fetchSymbols = fetch('http://data.fixer.io/api/symbols?access_key=' + APIKey);
        const fetchCountries = fetch('http://country.io/currency.json');

        const [
            getLatestRates,
            getSymbols,
            getCountries
        ] = await Promise.all([fetchLatestRates, fetchSymbols, fetchCountries]);

        const [
            ratesJson,
            symbolsJson,
            countriesJson
        ] = await Promise.all([getLatestRates.json(), getSymbols.json(), getCountries.json()]);

        appData.ratesData = ratesJson;
        appData.symbolsData = symbolsJson;
        appData.countriesData = countriesJson;

    }

    const renderList = () => {
        const listComponent = new List();
        list.appendChild(listComponent.render());

        const { rates } = appData.ratesData;
        const { symbols } = appData.symbolsData;
        const dropdownList = document.querySelector('#dropdownList');
        for (const rate in rates) {
            const listItemComponent = new ListItem({symbol: symbols[rate], rate: rate});
            dropdownList.appendChild(listItemComponent.render());
        }
    }
    await load();
	renderList();
}