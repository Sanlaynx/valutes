class List extends Component {
    constructor() {
        super();
        this._element = null;
    }

    setEventListener() {
        this.showButton = this._element.querySelector(`#showRatesList`);
        this.showButton.addEventListener(`click`, this.onClickBtn);
    }

    get template() {
        return `<div>
                    <button class="btn" id="showRatesList">Список валют</button>
                    <div class="list" id="dropdownList"></div>
                </div>`.trim();
    }

    onClickBtn(event) {
        event.preventDefault();
        document.querySelector('#dropdownList').classList.toggle('show');
        document.querySelector('#content').innerHTML = '';

    }

    removeEventListener() {
        this.showButton.removeEventListener(`click`, this.onClickBtn);
    }
}
