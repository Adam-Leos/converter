import './ratio-widget.scss';

class RatioWidget {
  constructor() {
    this.initUI();
  }

  initUI() {
    const currencyToFill = ['EUR', 'RUB'];
    this.fillRatioWidget(currencyToFill);
  }

  // TODO caching data
  fetchCurrencyRatio = (currencyFrom = 'USD') => {
    const url = `http://api.fixer.io/latest?base=${currencyFrom}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => data.rates);
  }

  // TODO empty widget message
  fillRatioWidget = async (currencyToFill = []) => {
    const USDRatio = await this.fetchCurrencyRatio('USD');
    const ratioWidgetBody = document.querySelector('.j-ratio-widget-body');
    let currencyRatioHtml = '';

    currencyToFill.forEach((currency) => {
      ratioWidgetBodyHtml += `
        <tr class="ratio-widget__row">
          <td class="ratio-widget__data ratio-widget__data--currency">${currency}</td>
          <td class="ratio-widget__data">${USDRatio[currency]}</td>
        </tr>
      `;
    });

    ratioWidgetBody.innerHTML = currencyRatioHtml;
  }
}

export default new RatioWidget();
