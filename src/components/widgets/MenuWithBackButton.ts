import { Lightning, Router } from '@lightningjs/sdk';
import { Colors } from '../../constants/colors';

export default class MenuWithBackButton extends Lightning.Component {
  static _template() {
    return {
      TopHeader: {
        BackButton: {
          h: 80,
          w: 80,
          color: Colors.SURFACE,
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

  // Consume Left so the Router doesn't hand focus back to the page (see Menu._handleLeft)
  _handleLeft() {}

  _handleRight() {
    Router.restoreFocus();
  }

  _focus() {
    this.patch({
      TopHeader: {
        BackButton: {
          smooth: { color: Colors.ACCENT },
          Icon: { smooth: { color: Colors.BACKGROUND } }
        }
      }
    });
  }

  _unfocus() {
    this.patch({
      TopHeader: {
        BackButton: {
          smooth: { color: Colors.SURFACE },
          Icon: { smooth: { color: Colors.WHITE } }
        }
      }
    });
  }

  _handleEnter() {
    Router.back();
  }
}
