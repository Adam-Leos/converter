import './../../global/reset.css';
import './../../global/global.scss';
import './../main/main.scss'; // TODO do own styles
import './../../components/converter/Converter';

class Information {
  constructor() {
    console.log('information inited');
  }
}

document.addEventListener(
  'DOMContentLoaded',
  () => new Information(),
);
