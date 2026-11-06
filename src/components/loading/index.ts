import { Lightning, Utils } from '@lightningjs/sdk';

export default class Spinner extends Lightning.Component {
  static _template() {
    return {
      Spinner: {
        texture: Lightning.Tools.getSvgTexture(Utils.asset('images/spinner.svg'), 72, 72),
        mountX: 0.5,
        x: 960,
        y: 820,

        alpha: 0,
        transitions: {
          alpha: { delay: 1.5, duration: 2, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' }
        }
      }
    };
  }

  _init() {
    this._spinnerAnimation = this.animation({
      duration: 0.9,
      repeat: -1,
      actions: [
        {
          t: 'Spinner',
          p: 'rotation',
          sm: 0,
          v: (t: number) => t * 2 * Math.PI
        }
      ]
    });

    this.tag('Spinner').setSmooth('alpha', 1);
    this._spinnerAnimation.start();
  }

  _inactive() {
    this._spinnerAnimation.stop();
  }
}
