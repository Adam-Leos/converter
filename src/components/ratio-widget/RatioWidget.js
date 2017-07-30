import './ratio-widget.scss';

class RatioWidget {
  constructor() {
    this.defaultWidgetCurrency = 'USD';
    this.defaultCurrenciesCollection = ['EUR', 'RUB', 'GBP', 'JPY'];

    this.initUI();
    this.bindEvents();
  }

  initUI() {
    this.fillRatioWidget();
  }

  bindEvents() {
    const togglePanelArrow = document.querySelector('.j-toggle-ratio-panel');
    const ratioCheckboxes = document.querySelectorAll('.j-ratio-checkbox');

    ratioCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener(
        'change',
        this.toggleRatioVisibility,
      );
    });

    togglePanelArrow.addEventListener(
      'click',
      this.toggleRatioPanel,
    );
  }

  // TODO don't use cach in case of outdated data
  getCurrencyRatio = (currencyFrom = 'USD') => {
    const upperCasecurrencyFrom = currencyFrom.toUpperCase();
    const localStorageRatio = localStorage.getItem(upperCasecurrencyFrom);
    const isRatioStored = localStorage.getItem(upperCasecurrencyFrom) !== null;

    if (isRatioStored) {
      return JSON.parse(localStorageRatio);
    }
    const url = `http://api.fixer.io/latest?base=${upperCasecurrencyFrom}`;

    return fetch(url)
      .then(response => response.json())
      .then((data) => {
        const ratio = data.rates;

        localStorage.setItem(upperCasecurrencyFrom, JSON.stringify(ratio));
        return ratio;
      });
  }

  fillRatioWidget = async (
    widgetCurrency = this.defaultWidgetCurrency,
    сurrenciesToFill = this.defaultCurrenciesCollection,
  ) => {
    const currencyRatio = await this.getCurrencyRatio(widgetCurrency);
    const ratioWidgetBody = document.querySelector('.j-ratio-widget-body');
    let currencyRatioHtml = '';

    сurrenciesToFill.forEach((currency) => {
      const upperCaseCurrency = currency.toUpperCase();

      currencyRatioHtml += `
        <tr class="ratio-widget__row j-ratio-currency-row" data-currency="${upperCaseCurrency}">
          <td class="ratio-widget__data ratio-widget__data--currency">${upperCaseCurrency}</td>
          <td class="ratio-widget__data">${currencyRatio[upperCaseCurrency]}</td>
        </tr>
      `;
    });

    ratioWidgetBody.innerHTML = currencyRatioHtml;
  }

  toggleRatioPanel = (event) => {
    const ratioPanel = document.querySelector('.j-ratio-panel');
    const ratioArrow = event.target;

    ratioPanel.classList.toggle('active');
    ratioArrow.classList.toggle('active');
  }

  // TODO add chosing of currency to show ratio for
  toggleRatioVisibility = async (event) => {
    const currencyRatioRows = document.querySelectorAll('.j-ratio-currency-row');
    const ratioWidgetFoot = document.querySelector('.j-ratio-widget-foot');
    const trigderedCheckbox = event.target;
    const triggeredCheckboxValue = trigderedCheckbox.value;
    const isCheckboxChecked = trigderedCheckbox.checked;

    if (isCheckboxChecked) {
      const ratioWidgetBody = document.querySelector('.j-ratio-widget-body');
      const ratioWidgetBodyHTML = ratioWidgetBody.innerHTML;
      const upperCaseCurrency = triggeredCheckboxValue.toUpperCase();
      const widgetCurrency = document.querySelector('.j-ratio-widget-currency').innerHTML.toUpperCase();
      const currencyRatio = await this.getCurrencyRatio(widgetCurrency);
      const currencyRatioHtml = `
        <tr class="ratio-widget__row j-ratio-currency-row" data-currency="${triggeredCheckboxValue}">
          <td class="ratio-widget__data ratio-widget__data--currency">${upperCaseCurrency}</td>
          <td class="ratio-widget__data">${currencyRatio[upperCaseCurrency]}</td>
        </tr>
      `;

      ratioWidgetBody.innerHTML = ratioWidgetBodyHTML + currencyRatioHtml;
      ratioWidgetFoot.classList.add('hidden');
    } else {
      currencyRatioRows.forEach((row, index, array) => {
        const currencyData = row.dataset.currency;
        const arrayLength = array.length;

        if (triggeredCheckboxValue === currencyData) {
          row.remove();

          if (arrayLength === 1) {
            ratioWidgetFoot.classList.remove('hidden');
          }
        }
      });
    }
  }
}

export default new RatioWidget();
