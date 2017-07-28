import 'reset-css/reset.css';
import './../main/main.scss'; // TODO do own styles
import './../../components/copyright/copyright.scss';
import './../../components/ratio-widget/RatioWidget';

class Information {
  constructor() {
    console.log('information inited');
  }
}

document.addEventListener(
  'DOMContentLoaded',
  () => new Information(),
);
