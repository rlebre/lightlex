import { Lightning, Router } from '@lightningjs/sdk';
import Spinner from '../components/loading';
import Logo from '../components/logo';

export default class Splash extends Lightning.Component {
  static _template() {
    return {
      Logo: {
        type: Logo
      },
      Spinner: {
        type: Spinner
      }
    };
  }

  _init() {
    this._logoAnimation = this.tag('Logo').animation({
      duration: 2,
      delay: 1,
      actions: [
        { t: 'Logo', p: 'alpha', v: { 0: 0, 0.25: 0, 1: 1 } },
        { t: 'Logo', p: 'y', v: { 0: 1080, 1: 440 } }
      ]
    });

    this._logoAnimation.on('finish', () => {
      setTimeout(() => Router.resume(), 1000);
    });
  }

  _active() {
    this._logoAnimation.start();
  }
}
