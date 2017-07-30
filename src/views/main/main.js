import 'reset-css/reset.css';
import './main.scss';
import './../../components/converter/Converter';
import RatioWidget from './../../components/ratio-widget/RatioWidget';

class Main {
  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    document.querySelector('.j-convert-currency').addEventListener(
      'click',
      this.changeRatioWidgetCurrency,
    );
  }

  // TODO change only needed row, don't redraw everything
  changeRatioWidgetCurrency = () => {
    const currencyFrom = document.querySelector('.j-currency-from').value.toUpperCase();
    const ratioWidgetCurrency = document.querySelector('.j-ratio-widget-currency');
    const ratioWidgetCurrencyValue = ratioWidgetCurrency.innerHTML.toUpperCase();

    if (currencyFrom === ratioWidgetCurrencyValue) {
      return false;
    }

    const ratioWidgetRows = document.querySelectorAll('.j-ratio-currency-row');
    const currenciesToShow = [ratioWidgetCurrencyValue];

    ratioWidgetRows.forEach((row) => {
      if (row.dataset.currency !== currencyFrom) {
        const upperCaseCurrency = row.dataset.currency.toUpperCase();
        currenciesToShow.push(upperCaseCurrency);
      }
    });

    ratioWidgetCurrency.innerHTML = currencyFrom;
    RatioWidget.fillRatioWidget(currencyFrom, currenciesToShow);
  }
}

document.addEventListener(
  'DOMContentLoaded',
  () => new Main(),
);
