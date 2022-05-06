import { Lightning, Router } from '@lightningjs/sdk';
import { Colors } from '../../constants/colors';

export default class MenuWithBackButton extends Lightning.Component {
  static _template() {
    return {
      TopHeader: {
        BackButton: {
          h: 80,
          w: 80,
          color: Colors.LIGHT_GRAY,
          rect: true,
          rtt: true,
          shader: { type: Lightning.shaders.RoundedRectangle, radius: 40 }
        }
      }
    };
  }

  _init() {
    this._index = 0;
  }

  _handleRight() {
    Router.restoreFocus();
  }

  _focus() {
    this.patch({
      TopHeader: {
        BackButton: {
          smooth: { color: 0xffe50914 }
        }
      }
    });
  }

  _unfocus() {
    this.patch({
      TopHeader: {
        BackButton: {
          smooth: { color: 0xff404249 }
        }
      }
    });
  }

  _handleEnter() {
    Router.back();
  }
}
