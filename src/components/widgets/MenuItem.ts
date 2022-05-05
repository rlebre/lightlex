import { Lightning } from '@lightningjs/sdk';
import { Colors } from '../../constants/colors';

export default class MenuItem extends Lightning.Component {
  static _template() {
    return {
      color: Colors.WHITE,
      text: { text: 'Home', fontSize: 25, fontStyle: 'bold' }
    };
  }

  set label(v: string) {
    this._label = v;

    this.patch({
      text: { text: this._label }
    });
  }

  set id(v) {
    this._id = v.replace(/ /g, '');
  }

  get id() {
    return this._id;
  }

  set selected(bool) {
    if (bool) {
      this.patch({
        text: { textColor: Colors.ORANGE, alpha: 0.6 }
      });
    } else {
      this.patch({
        text: { textColor: Colors.WHITE, alpha: 1 }
      });
    }
    this._selected = bool;
  }

  get selected() {
    return this._selected;
  }

  _focus() {
    this.patch({
      text: { textColor: Colors.ORANGE }
    });
  }

  _unfocus() {
    this.patch({
      text: { textColor: Colors.WHITE }
    });
  }
}
