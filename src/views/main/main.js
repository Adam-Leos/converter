import './../../global/reset.css';
import './../../global/global.scss';
import './main.scss';
import './../../components/converter/Converter';

class Main {
  constructor() {
    console.log(typeof null);
  }
}

document.addEventListener(
  'DOMContentLoaded',
  () => new Main(),
);
