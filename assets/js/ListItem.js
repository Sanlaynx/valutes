class ListItem extends Component {
    constructor(data) {
        super(data);
        this._symbol = data.symbol;
        this._rate = data.rate;
        this.onClickListItem = this.onClickListItem.bind(this);
    }

    setEventListener() {
        this._element.addEventListener(`click`, this.onClickListItem);
    }

    get template() {
        return `<span class="list-item" data-symbol="${this._rate}">
                    ${this._symbol}
                </span>`.trim();
    }

    onClickListItem(event) {
        const span = event.currentTarget;

        const { symbol } = span.dataset;
        const { symbols } = appData.symbolsData;
        const { rates, base } = appData.ratesData;

        const countryCode = this.findCountryCode(symbol);
        const img = document.createElement('img');
        img.src = `https://flagcdn.com/h80/${countryCode}.png`
        img.height = 80;
        img.alt = symbols[symbol];

        const rateName = document.createElement('span');
        rateName.innerHTML = `${symbols[symbol]} - ${rates[symbol]} ${base}`;
        rateName.classList.add('rate-name')

        const content = document.getElementById('content');
        content.innerHTML = '';
        content.appendChild(img);
        content.appendChild(rateName);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    findCountryCode(symbol) {
        for (const country in appData.countriesData) {
            if (appData.countriesData[country] === symbol) {
                return country.toLowerCase();
            }
        }
    }

    removeEventListener() {
        this._element.removeEventListener(`click`, this.onClickListItem);
    }
}
