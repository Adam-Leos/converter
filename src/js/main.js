import './../libs/reset.css';
import './../scss/main.scss';
import './converter/Converter';

class Main {
  constructor() {
    console.log('main inited');
  }
}

document.addEventListener(
  'DOMContentLoaded',
  () => new Main(),
);
