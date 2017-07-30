import 'reset-css/reset.css';
import './../main/main.scss'; // TODO do own styles
import './../../components/copyright/copyright.scss';

class Information {
  constructor() {
    console.log('information inited');
  }
}

document.addEventListener(
  'DOMContentLoaded',
  () => new Information(),
);
