import 'reset-css/reset.css';
import './contacts.scss';
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
