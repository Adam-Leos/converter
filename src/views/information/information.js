import './../libs/reset.css';
import './../scss/global/global.scss';
import './../scss/main.scss';

class Information {
  constructor() {
    console.log('information inited');
  }
}

document.addEventListener(
  'DOMContentLoaded',
  () => new Information(),
);
