import { Lightning, Utils } from '@lightningjs/sdk';

export default class Spinner extends Lightning.Component {
  static _template() {
    return {
      Spinner: {
        src: Utils.asset('images/spinner.png'),
        mountX: 0.5,
        x: 960,
        y: 820,
        color: 0xaaffffff,
        alpha: 0,
        transitions: {
          alpha: { delay: 1.5, duration: 2, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' }
        }
      }
    };
  }

  _init() {
    this._spinnerAnimation = this.animation({
      duration: 0.4,
      repeat: -1,
      actions: [
        {
          t: 'Spinner',
          p: 'rotation',
          sm: 0,
          v: (t: number) => {
            if (t < 0.125) {
              return 45 * (Math.PI / 180);
            } else if (t < 0.25) {
              return 90 * (Math.PI / 180);
            } else if (t < 0.375) {
              return 135 * (Math.PI / 180);
            } else if (t < 0.5) {
              return 180 * (Math.PI / 180);
            } else if (t < 0.625) {
              return 225 * (Math.PI / 180);
            } else if (t < 0.75) {
              return 270 * (Math.PI / 180);
            } else if (t < 0.875) {
              return 315 * (Math.PI / 180);
            } else if (t < 1) {
              return 360 * (Math.PI / 180);
            }
          }
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
