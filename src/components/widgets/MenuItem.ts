import { Lightning } from '@lightningjs/sdk';
import { Colors } from '../../constants/colors';

export default class MenuItem extends Lightning.Component {
  static _template() {
    return {
      flexItem: { marginBottom: 50 },
      Icon: {
        x: -40,
        h: 40,
        w: 40,
        texture: Lightning.Tools.getSvgTexture('icons/movies.svg', 50, 50),
        color: Colors.WHITE
      },
      h: 30,
      x: 40,
      mountY: 0.5,
      color: Colors.WHITE,
      text: { text: 'Home', fontSize: 0, fontStyle: 'bold' }
    };
  }

  set label(v: string) {
    this._label = v;

    this.patch({
      text: { text: this._label }
    });
  }

  set collapsed(collapsed: boolean) {
    if (collapsed) {
      this.tag('Icon').setSmooth('h', 40);
      this.tag('Icon').setSmooth('w', 40);

      this.patch({
        h: 40,
        text: { fontSize: 0 }
      });
    } else {
      this.tag('Icon').setSmooth('h', 30);
      this.tag('Icon').setSmooth('w', 30);

      this.patch({
        h: 0,
        text: { fontSize: 25 }
      });
    }
  }

  set icon(icon: string) {
    this.patch({
      Icon: {
        texture: Lightning.Tools.getSvgTexture(`icons/${icon}.svg`, 30, 30)
      }
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
        Icon: { color: Colors.ORANGE },
        text: { textColor: Colors.ORANGE, alpha: 0.6 }
      });
    } else {
      this.patch({
        Icon: { color: Colors.WHITE },
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
      Icon: { color: Colors.ORANGE },
      text: { textColor: Colors.ORANGE }
    });
  }

  _unfocus() {
    this.patch({
      Icon: { color: Colors.WHITE },
      text: { textColor: Colors.WHITE }
    });
  }
}
