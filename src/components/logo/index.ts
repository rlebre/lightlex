import { Lightning, Utils } from '@lightningjs/sdk';

export default class Logo extends Lightning.Component {
  static _template() {
    return {
      src: Utils.asset('images/lightlex-light.png'),
      x: 1920 / 2,
      y: 1080 / 2,
      mount: 0.5
    };
  }
}
