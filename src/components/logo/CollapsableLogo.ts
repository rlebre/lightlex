import { Lightning } from '@lightningjs/sdk';
import { Colors } from '../../constants/colors';

export default class CollapsableLogo extends Lightning.Component {
  _construct() {
    this._expandedTexture = Lightning.Tools.getSvgTexture('images/lightlex-light.svg', 137, 28);
    this._collapsedTexture = Lightning.Tools.getSvgTexture('images/lightlex-icon.svg', 32, 32);
  }

  static _template() {
    return {
      texture: Lightning.Tools.getSvgTexture('images/lightlex-icon.svg', 32, 32),
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
