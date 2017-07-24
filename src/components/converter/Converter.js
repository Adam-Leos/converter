import './converter.scss';

class Converter {
  constructor() {
    this.calculateCurrency = this.calculateCurrency.bind(this);
    this.fetchCurrencyRatio = this.fetchCurrencyRatio.bind(this);
    this.exchangeCurrency = this.exchangeCurrency.bind(this);

    this.bindEvents();
  }

  bindEvents() {
    document.querySelector('.j-currency-entered').addEventListener(
      'input',
      this.exchangeCurrency,
    );
    document.querySelector('.j-currency-from').addEventListener(
      'change',
      this.exchangeCurrency,
    );
  }

  async exchangeCurrency() {
    const calculatedInput = document.querySelector('.j-currency-calculated');
    const caluclatedCurrency = await this.calculateCurrency();
    const roundedValue = Math.round(caluclatedCurrency * 100) / 100;

    calculatedInput.value = roundedValue;
  }

  async calculateCurrency() {
    const currencyFrom = document.querySelector('.j-currency-from').value;
    const currencyTo = document.querySelector('.j-currency-to').value;

    if (currencyFrom === currencyTo) {
      const currentValue = document.querySelector('.j-currency-entered').value;

      return currentValue;
    }

    const enteredInput = document.querySelector('.j-currency-entered');
    const exchangeRatio = await this.fetchCurrencyRatio(currencyFrom, currencyTo);

    return enteredInput.value * exchangeRatio;
  }

  fetchCurrencyRatio(currencyFrom, currencyTo) {
    const url = `http://api.fixer.io/latest?base=${currencyFrom}`;

    return fetch(url)
      .then(response => response.json())
      .then((data) => {
        const rates = data.rates;
        const currency = currencyTo.toUpperCase();

        return rates[currency];
      });
  }
}

export default new Converter();
