import './ratio-widget.scss';

// TODO use templates for html
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
    const ratioPanel = document.querySelector('.j-ratio-panel');

    ratioPanel.addEventListener('change', (event) => {
      const eventTarget = event.target;

      if (eventTarget.classList.contains('j-ratio-checkbox')) {
        this.toggleRatioVisibility(eventTarget);
      }
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
    const ratioPanel = document.querySelector('.j-ratio-panel');
    let ratioPanelHTML = '';
    let currencyRatioHtml = '';

    сurrenciesToFill.forEach((currency) => {
      const upperCaseCurrency = currency.toUpperCase();

      currencyRatioHtml += `
        <tr class="ratio-widget__row j-ratio-currency-row" data-currency="${upperCaseCurrency}">
          <td class="ratio-widget__data ratio-widget__data--currency">${upperCaseCurrency}</td>
          <td class="ratio-widget__data">${currencyRatio[upperCaseCurrency]}</td>
        </tr>
      `;

      ratioPanelHTML += `
        <label class="ratio-widget__label">
          <input type="checkbox" class="ratio-widget__checkbox j-ratio-checkbox" name="${upperCaseCurrency}" value="${upperCaseCurrency}" checked>
          ${upperCaseCurrency}
        </label>
      `;
    });

    ratioWidgetBody.innerHTML = currencyRatioHtml;
    ratioPanel.innerHTML = ratioPanelHTML;
  }

  toggleRatioPanel = (event) => {
    const ratioPanel = document.querySelector('.j-ratio-panel');
    const ratioArrow = event.target;

    ratioPanel.classList.toggle('active');
    ratioArrow.classList.toggle('active');
  }

  // TODO add chosing of currency to show ratio for
  toggleRatioVisibility = async (triggeredCheckbox) => {
    const currencyRatioRows = document.querySelectorAll('.j-ratio-currency-row');
    const ratioWidgetFoot = document.querySelector('.j-ratio-widget-foot');
    const triggeredCheckboxValue = triggeredCheckbox.value;
    const isCheckboxChecked = triggeredCheckbox.checked;

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

        // TODO hiding and changing values, not removing
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
