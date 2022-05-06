import { Lightning } from '@lightningjs/sdk';
import { Colors } from '../../constants/colors';

export default class CollapsableLogo extends Lightning.Component {
  _construct() {
    this._cenas = 0;
    this._expandedTexture = Lightning.Tools.getSvgTexture('images/lightlex-light.svg', 150, 25);
    this._collapsedTexture = Lightning.Tools.getSvgTexture('images/lightlex-icon.svg', 40, 40);
  }

  static _template() {
    return {
      texture: Lightning.Tools.getSvgTexture('images/lightlex-icon.svg', 40, 40),
      color: Colors.WHITE
    };
  }

  set collapsed(collapsed: boolean) {
    if (collapsed) {
      this.setSmooth('texture', this._collapsedTexture);
    } else {
      this.setSmooth('texture', this._expandedTexture);
    }
  }
}
