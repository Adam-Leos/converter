import './../libs/reset.css';
import './../scss/global/global.scss';
import './../scss/main.scss';
import './converter/Converter';

class Main {
  constructor() {
    console.log(typeof undefined);
  }
}

document.addEventListener(
  'DOMContentLoaded',
  () => new Main(),
);
