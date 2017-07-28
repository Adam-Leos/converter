import RatioWidget from './../ratio-widget/RatioWidget';
import './converter.scss';

class Converter {
  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    document.querySelector('.j-convert-currency').addEventListener(
      'click',
      this.exchangeCurrency,
    );
  }

  // TODO value validation
  exchangeCurrency = async () => {
    const calculatedInput = document.querySelector('.j-currency-calculated');
    const caluclatedCurrency = await this.calculateCurrency();
    const roundedValue = Math.round(caluclatedCurrency * 100) / 100;

    calculatedInput.value = roundedValue;
  }

  calculateCurrency = async () => {
    const currencyFrom = document.querySelector('.j-currency-from').value.toUpperCase();
    const currencyTo = document.querySelector('.j-currency-to').value.toUpperCase();

    if (currencyFrom === currencyTo) {
      const currentValue = document.querySelector('.j-currency-entered').value;

      return currentValue;
    }

    const enteredInput = document.querySelector('.j-currency-entered');
    const rates = await RatioWidget.fetchCurrencyRatio(currencyFrom);

    return enteredInput.value * rates[currencyTo];
  }
}

export default new Converter();
