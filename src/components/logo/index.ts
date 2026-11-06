import { Lightning, Utils } from '@lightningjs/sdk';

export default class Logo extends Lightning.Component {
  static _template() {
    return {
      texture: Lightning.Tools.getSvgTexture(Utils.asset('images/lightlex-light.svg'), 640, 131),
      x: 1920 / 2,
      y: 1080 / 2,
      mount: 0.5
    };
  }
}
