import { Lightning, Router } from '@lightningjs/sdk';
import { Colors } from '../../constants/colors';

export default class MenuWithBackButton extends Lightning.Component {
  static _template() {
    return {
      TopHeader: {
        BackButton: {
          h: 80,
          w: 80,
          color: Colors.DARK_GRAY,
          rect: true,
          rtt: true,
          Icon: {
            x: 40,
            y: 40,
            mount: 0.5,
            z: 1,
            texture: Lightning.Tools.getSvgTexture('icons/arrow-back.svg', 40, 40),
            color: Colors.WHITE
          },
          shader: { type: Lightning.shaders.RoundedRectangle, radius: 40 }
        }
      }
    };
  }

  _handleRight() {
    Router.restoreFocus();
  }

  _focus() {
    this.patch({
      TopHeader: {
        BackButton: {
          smooth: { color: Colors.ORANGE }
        }
      }
    });
  }

  _unfocus() {
    this.patch({
      TopHeader: {
        BackButton: {
          smooth: { color: Colors.DARK_GRAY }
        }
      }
    });
  }

  _handleEnter() {
    Router.back();
  }
}
